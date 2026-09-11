import * as vscode from 'vscode';
import { FunctionKeywordCache, functionLanguages } from './function-keywords';
import { Grammars } from './grammars';

const themeName = 'Vyrion Two Dark';

export function activate(context: vscode.ExtensionContext): void {
  const output = vscode.window.createOutputChannel(themeName);
  const box = vscode.window.createTextEditorDecorationType({
    backgroundColor: new vscode.ThemeColor('vyrionTwoDark.functionBoxBackground'),
    color: new vscode.ThemeColor('vyrionTwoDark.functionBoxForeground'),
    border: '1px solid',
    borderColor: new vscode.ThemeColor('vyrionTwoDark.functionBoxBorder'),
    borderRadius: '5px',
    fontWeight: 'bold',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
  });
  const caches = new Map<vscode.TextDocument, FunctionKeywordCache>();
  const running = new Set<Promise<void>>();
  let grammars: Grammars | undefined;
  let generation = 0;
  let disposed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function enabled(document: vscode.TextDocument): boolean {
    return vscode.workspace.getConfiguration('workbench').get('colorTheme') === themeName
      && vscode.workspace.getConfiguration('vyrionTwoDark', document).get('functionBoxes.enabled', true)
      && functionLanguages.has(document.languageId);
  }

  async function render(document: vscode.TextDocument, expectedGeneration: number): Promise<void> {
    const version = document.version;
    const cancelled = () => disposed || expectedGeneration !== generation || document.version !== version || document.isClosed;
    try {
      const grammar = await (grammars ??= new Grammars()).load(document.languageId);
      if (!grammar || cancelled()) return;
      const editors = vscode.window.visibleTextEditors.filter(editor => editor.document === document);
      const endLine = Math.min(document.lineCount - 1, Math.max(-1,
        ...editors.flatMap(editor => editor.visibleRanges.map(range => range.end.line + 20))));
      const cache = caches.get(document) ?? new FunctionKeywordCache();
      caches.set(document, cache);
      const spans = await cache.scan(grammar, line => document.lineAt(line).text, endLine, cancelled,
        () => new Promise(resolve => setTimeout(resolve, 0)));
      if (!spans || cancelled()) return;
      const ranges = spans.map(span => new vscode.Range(span.line, span.start, span.line, span.end));
      for (const editor of vscode.window.visibleTextEditors) {
        if (editor.document === document) editor.setDecorations(box, ranges);
      }
    } catch (error) {
      if (!cancelled()) output.appendLine(`Function boxes (${document.languageId}): ${String(error)}`);
    }
  }

  function schedule(): void {
    generation++;
    if (timer) clearTimeout(timer);
    for (const editor of vscode.window.visibleTextEditors) {
      if (!enabled(editor.document)) editor.setDecorations(box, []);
    }
    timer = setTimeout(() => {
      const documents = new Set(vscode.window.visibleTextEditors.map(editor => editor.document));
      for (const document of caches.keys()) if (!documents.has(document)) caches.delete(document);
      for (const document of documents) {
        if (!enabled(document)) continue;
        const job = render(document, generation);
        running.add(job);
        void job.finally(() => running.delete(job));
      }
    }, 100);
  }

  function resetGrammars(): void {
    generation++;
    const previous = grammars;
    grammars = undefined;
    caches.clear();
    for (const editor of vscode.window.visibleTextEditors) editor.setDecorations(box, []);
    void Promise.allSettled([...running]).then(() => previous?.dispose());
    schedule();
  }

  context.subscriptions.push(output, box,
    vscode.window.onDidChangeVisibleTextEditors(schedule),
    vscode.window.onDidChangeTextEditorVisibleRanges(schedule),
    vscode.window.onDidChangeActiveColorTheme(schedule),
    vscode.extensions.onDidChange(resetGrammars),
    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration('workbench.colorTheme') || event.affectsConfiguration('vyrionTwoDark')) schedule();
    }),
    vscode.workspace.onDidChangeTextDocument(event => {
      if (!event.contentChanges.length) return;
      const firstLine = Math.min(...event.contentChanges.map(change => change.range.start.line));
      caches.get(event.document)?.invalidate(firstLine);
      for (const editor of vscode.window.visibleTextEditors) {
        if (editor.document === event.document) editor.setDecorations(box, []);
      }
      schedule();
    }),
    vscode.workspace.onDidOpenTextDocument(schedule),
    vscode.workspace.onDidCloseTextDocument(document => {
      caches.delete(document);
      schedule();
    }),
    new vscode.Disposable(() => {
      disposed = true;
      if (timer) clearTimeout(timer);
      caches.clear();
      void Promise.allSettled([...running]).then(() => grammars?.dispose());
    }),
  );
  schedule();
}
