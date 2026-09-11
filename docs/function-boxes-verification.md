# Verificação das caixas — 0.2.0

Executada em 10 de setembro de 2026 (America/Sao_Paulo), com VS Code desktop
1.136.1. O [resultado estruturado](function-boxes-verification.json) registra
timestamp UTC, hash do VSIX, gramáticas, renderização e instalação.

- A checagem TypeScript passou para o componente e os testes.
- Dez casos com gramáticas reais passaram: Python, Rust, TypeScript, TSX,
  JavaScript, JSX, Go, C, C++ e Dart. Incluem async, generator, métodos, texto
  JSX, comentários, strings e identificadores como `constructor`/`__proto__`.
- Abertura/fechamento de string multilinha, inserção de linha, cancelamento e
  interrupção em linha extensa passaram no cache de tokenização.
- Um Extension Development Host isolado carregou o conteúdo extraído do VSIX.
  A leitura do DOM do renderer confirmou três caixas Python, duas Rust, duas
  TypeScript e duas Go. Capturas do editor foram examinadas visualmente.
- O renderer confirmou fundo `#F2F5E8`, texto `#5F7A32` em negrito, raio de 5 px
  e borda da mesma cor do fundo.
- Desativar/reativar a opção, trocar/restaurar o tema, mudar para texto simples
  e voltar a Python, e abrir/reverter uma string multilinha removeram/restauraram
  as caixas conforme esperado: doze etapas visuais concluídas.
- O VSIX contém 12 entradas, incluindo o componente JS e Oniguruma/WASM. Não
  inclui `node_modules`, testes ou o checkout de referência. A instalação local
  de `t4lesss.vyrion-two-dark` 0.2.0 passou; runtime e temas instalados foram
  comparados byte a byte com o pacote.
- `themes/OneDark.json` conserva o hash da base adotada em `UPSTREAM.md`.

A verificação de renderização usou as gramáticas embutidas, sem servidores de
linguagem de terceiros. Não afirma cobertura universal de outras gramáticas,
provedores, VS Code Web ou todas as construções de cada linguagem. C/C++/Dart
foram verificados quanto à ausência da caixa nas formas usuais sem palavra
introdutória. As demais cores continuam vindo da base.

Os testes repetíveis de gramática estão em `tests/smoke.ts`, com comandos em
[development.md](development.md#alterar-as-caixas). O roteiro visual foi descrito
nesse mesmo guia. Logs, driver nativo, leitura do DOM e capturas locais ficam em
`.vscode-test/visual/`, ignorados pelo Git.

A revisão corrigiu dois detalhes: o limite inicial de tokenização era baixo
para compilar gramáticas de JSX na primeira leitura; o mapa de palavras agora
usa `Map`, evitando colisões com propriedades como `constructor`. O ensaio de
troca de tema foi isolado das configurações de `samples/`, que fixam o tema do
preview. Os resultados acima pertencem à execução final após essas correções.
