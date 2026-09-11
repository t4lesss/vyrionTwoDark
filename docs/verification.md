# Verificação da base 0.1.0

Executada em 2026-09-11 UTC (2026-09-10 no horário de São Paulo), com VS Code
1.136.1, Node.js 24.21.0, npm 11.19.0 e @vscode/vsce 3.9.2.

- Os dois checkouts partem do commit upstream registrado em `UPSTREAM.md`.
- O arquivo-base e a licença são idênticos nos checkouts. O SHA-256 do tema
  também coincide com a instalação original Atom One Dark 2.3.0.
- Manifesto, workspace, launch/tasks e configurações das amostras passaram
  pela leitura JSON; as novas amostras Python/TOML passaram pelo parser nativo.
- `npm ci` concluiu usando o lockfile; `npm run package` e `install:local`
  concluíram com o empacotador oficial.
- O VSIX contém os dois JSONs do tema, manifesto, README, changelog, licença
  e ícone, sem `node_modules` nem dependência do checkout irmão.
- `code --list-extensions --show-versions` confirmou as duas extensões:
  `akamud.vscode-theme-onedark@2.3.0` e `t4lesss.vyrion-two-dark@0.1.0`.
- Um Extension Development Host isolado descobriu ambas as extensões. Após
  selecionar cada tema, o comando nativo **Generate Color Theme From Current
  Settings** gerou snapshots iguais: 70 cores explícitas exportadas e 215 regras
  de tokens, incluindo regras adicionadas pelo próprio VS Code.

A instância de verificação usou dados de usuário temporários, sem personalizações
pessoais de cores ou extensões de linguagem de terceiros. As extensões embutidas
do VS Code permaneceram disponíveis. O gerador compara cores e regras exportadas;
isso não substitui a revisão visual das futuras mudanças em cada linguagem.

Os snapshots e o resultado bruto desta execução ficam localmente em
`.vscode-test/baseline/`, ignorado pelo Git. O workspace real foi configurado
para manter o original como referência e os ajustes na camada própria do fork.
