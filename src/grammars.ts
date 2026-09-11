import * as vscode from 'vscode';
import { Registry, parseRawGrammar } from 'vscode-textmate';
import { createOnigScanner, createOnigString, loadWASM } from 'vscode-oniguruma';
import wasmAsset from 'vscode-oniguruma/release/onig.wasm';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

let oniguruma: ReturnType<typeof loadOniguruma> | undefined;
async function loadOniguruma() {
  await loadWASM(await readFile(join(__dirname, wasmAsset)));
  return { createOnigScanner, createOnigString };
}

interface GrammarContribution {
  scopeName: string;
  path: string;
  language?: string;
  injectTo?: string[];
}

/** Read installed grammar contributions using the public API, never VS Code internals. */
export class Grammars implements vscode.Disposable {
  private readonly registry: Registry;
  private readonly languages = new Map<string, string>();

  constructor() {
    const sources = new Map<string, vscode.Uri>();
    const injections = new Map<string, Set<string>>();
    for (const extension of vscode.extensions.all) {
      const entries: GrammarContribution[] = extension.packageJSON.contributes?.grammars ?? [];
      for (const entry of entries) {
        if (typeof entry.scopeName !== 'string' || typeof entry.path !== 'string') continue;
        sources.set(entry.scopeName, vscode.Uri.joinPath(extension.extensionUri, entry.path));
        if (entry.language) this.languages.set(entry.language, entry.scopeName);
        for (const target of entry.injectTo ?? []) {
          const set = injections.get(target) ?? new Set<string>();
          set.add(entry.scopeName);
          injections.set(target, set);
        }
      }
    }
    this.registry = new Registry({
      onigLib: oniguruma ??= loadOniguruma(),
      loadGrammar: async scope => {
        const uri = sources.get(scope);
        if (!uri) return null;
        return parseRawGrammar(Buffer.from(await vscode.workspace.fs.readFile(uri)).toString('utf8'), uri.path);
      },
      getInjections: scope => [...injections]
        .filter(([target]) => scope === target || scope.startsWith(`${target}.`))
        .flatMap(([, entries]) => [...entries]),
    });
  }

  load(language: string) {
    const scope = this.languages.get(language);
    return scope ? this.registry.loadGrammar(scope) : Promise.resolve(null);
  }

  dispose(): void { this.registry.dispose(); }
}
