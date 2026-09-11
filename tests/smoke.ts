import * as vscode from 'vscode';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Grammars } from '../src/grammars';
import { FunctionKeywordCache } from '../src/function-keywords';

export async function run(): Promise<void> {
  const grammars = new Grammars();
  const fixtures: [string, string, number[]][] = [
    ['python', '# def fake():\ntext = "def fake():"\n"""\ndef fake():\n"""\nasync def PytholinoMeAjude():\n    return\ndef incomplete:', [5, 7]],
    ['rust', '// fn fake() {}\nlet text = "fn fake() {}";\n/*\nfn fake() {}\n*/\nasync fn help() {}', [5]],
    ['typescript', '// function fake() {}\nconst text = `function fake() {}`;\n/*\nfunction fake() {}\n*/\nexport async function help() {}\nconst arrow = () => 1;\nconst o = { function: 1, method() {} };', [5]],
    ['typescriptreact', 'function Help() { return <div>function fake()</div>; }', [0]],
    ['javascript', 'function* help() { yield 1; }\nconst text = "function";\nclass Example { constructor() {} toString() { return ""; } }\nconst __proto__ = 1;', [0]],
    ['javascriptreact', 'function Help() { return <div>function fake()</div>; }', [0]],
    ['go', 'package main\n// func fake() {}\nvar text = `\nfunc fake() {}\n`\nfunc help() {}\nfunc (s Server) run() {}', [5, 6]],
    ['c', '/* def fn func function */\nint help(void) { return 1; }', []],
    ['cpp', '// def fn func function\nauto help() -> int { return 1; }', []],
    ['dart', '// def fn func function\nint help() { return 1; }', []],
  ];
  const results = [];
  try {
    for (const [language, source, expectedLines] of fixtures) {
      const grammar = await grammars.load(language);
      assert(grammar, `No installed grammar for ${language}`);
      const lines = source.split('\n');
      const cache = new FunctionKeywordCache();
      const spans = await cache.scan(grammar, i => lines[i], lines.length - 1, () => false, async () => {});
      assert.deepEqual(spans?.map(span => span.line), expectedLines, language);
      results.push({ language, keywords: spans?.map(span => lines[span.line].slice(span.start, span.end)) });
    }
    const python = await grammars.load('python');
    assert(python);
    const cache = new FunctionKeywordCache();
    let lines = ['# start', 'def visible():', '    return'];
    const scan = () => cache.scan(python, i => lines[i], lines.length - 1, () => false, async () => {});
    assert.equal((await scan())?.length, 1);
    lines[0] = '"""';
    cache.invalidate(0);
    assert.equal((await scan())?.length, 0, 'Opening a multiline string must remove later boxes');
    lines[0] = '# restored';
    cache.invalidate(0);
    assert.equal((await scan())?.length, 1, 'Removing the multiline string must restore boxes');
    lines.unshift('# inserted line');
    cache.invalidate(0);
    assert.equal((await scan())?.[0].line, 2, 'Ranges must shift after insertion');
    cache.invalidate(0);
    assert.equal(await cache.scan(python, i => lines[i], 3, () => true, async () => {}), undefined);
    lines = ['#'.repeat(20_001), 'def skipped():'];
    assert.equal((await scan())?.length, 0, 'Do not continue with an unknown grammar state');

    const extension = vscode.extensions.getExtension('t4lesss.vyrion-two-dark');
    assert(extension);
    await extension.activate();
    const folder = process.env.VYRION_TEST_OUTPUT;
    if (folder) {
      await mkdir(folder, { recursive: true });
      await writeFile(join(folder, 'result.json'), JSON.stringify({
        result: 'PASS', checkedAt: new Date().toISOString(), vscode: vscode.version,
        fixtures: results, edits: ['multiline string open/close', 'line insertion', 'cancellation', 'long line stop'],
        extensionActivated: extension.isActive,
      }, null, 2) + '\n');
    }
    console.log(`VYRION_BOXES_PASS: ${fixtures.length} grammar fixtures and incremental edits`);
  } finally {
    grammars.dispose();
  }
}
