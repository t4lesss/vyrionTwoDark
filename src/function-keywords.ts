import type { IGrammar, StateStack } from 'vscode-textmate';

// One visual role, with adapters for the grammar's vocabulary.
// Require both the word and its leaf scope: strings/comments never match by text alone.
const scopesByWord = new Map<string, readonly string[]>([
  ['def', ['storage.type.function.python']],
  ['fn', ['keyword.other.fn.rust']],
  ['function', ['storage.type.function.ts', 'storage.type.function.tsx', 'storage.type.function.js', 'storage.type.function.js.jsx']],
  ['func', ['keyword.function.go']],
]);

export const functionLanguages = new Set([
  'python', 'rust', 'typescript', 'typescriptreact', 'javascript', 'javascriptreact', 'go',
]);

export function isFunctionKeyword(word: string, scopes: readonly string[]): boolean {
  const leaf = scopes.at(-1);
  return leaf !== undefined && (scopesByWord.get(word)?.includes(leaf) ?? false);
}

export interface KeywordSpan {
  line: number;
  start: number;
  end: number;
}

interface TokenizedLine {
  state: StateStack;
  spans: KeywordSpan[];
}

/** Retain only the unchanged prefix: a quote/comment edit can affect all later lines. */
export class FunctionKeywordCache {
  private readonly lines: TokenizedLine[] = [];

  invalidate(fromLine: number): void {
    this.lines.length = Math.min(this.lines.length, fromLine);
  }

  async scan(
    grammar: IGrammar,
    lineAt: (line: number) => string,
    endLine: number,
    cancelled: () => boolean,
    yieldToEditor: () => Promise<void>,
  ): Promise<KeywordSpan[] | undefined> {
    let sliceStart = Date.now();
    for (let line = this.lines.length; line <= endLine; line++) {
      if (cancelled()) return undefined;
      const text = lineAt(line);
      // Never invent a continuation state after an oversized/unfinished tokenization.
      if (text.length > 20_000) break;
      const result = grammar.tokenizeLine(text, this.lines.at(-1)?.state ?? null, 50);
      if (result.stoppedEarly) break;
      const spans = result.tokens.flatMap(token => {
        const end = Math.min(token.endIndex, text.length);
        return isFunctionKeyword(text.slice(token.startIndex, end), token.scopes)
          ? [{ line, start: token.startIndex, end }]
          : [];
      });
      this.lines.push({ state: result.ruleStack, spans });
      if (Date.now() - sliceStart >= 8) {
        await yieldToEditor();
        sliceStart = Date.now();
      }
    }
    return cancelled() ? undefined : this.lines.slice(0, endLine + 1).flatMap(line => line.spans);
  }
}
