# Vyrion Two Dark

Fork incremental do [Atom One Dark](https://github.com/akamud/vscode-theme-onedark)
para VS Code. A série local `0.2.2-dev.N` combina texto em off-white quente com botões verde
oliva e preserva as caixas claras das palavras de função: `def`, `fn`, `function`
e `func`. Os títulos têm um marfim um pouco mais quente, com variações de verde
para ações principais, secundárias e hover.

O verde principal `#6A6E23` vem da imagem de referência; os rótulos dos botões usam
`#FFFBF0`, mais claro. Para novas iterações instaláveis, `npm run version:iteration`
avança somente o contador `dev.N`; os marcos estáveis ficam para consolidações.

O arquivo `themes/OneDark.json` pertence à base upstream. As personalizações
ficam em [themes/VyrionTwoDark-color-theme.json](themes/VyrionTwoDark-color-theme.json),
que inclui essa base. O componente em `src/` desenha as caixas pela API de
decorações do VS Code. Tudo acompanha a extensão; ela funciona sem o checkout
de referência e pode ser instalada ao lado do Atom One Dark.

## Workspace

```text
vyrionTwoDark/                 pasta organizadora, sem Git próprio
├── origem/                   clone de referência, na revisão adotada
└── modificado/               este repositório; desenvolvimento na branch main
```

Abra [vyrionTwoDark.code-workspace](vyrionTwoDark.code-workspace) para ver os dois
checkouts. O editor trata `origem/` como somente leitura nesse workspace.
A referência permanece na revisão registrada em [UPSTREAM.md](UPSTREAM.md).

## Experimentar uma mudança

Para decidir se uma regra deve ser comum ou específica de uma linguagem,
consulte o [planejamento das regras](docs/theme-design.md). Ele separa papéis
visuais, TextMate e realce semântico, com exemplos conferidos para Python,
Rust, TypeScript, Go, C, C++ e Dart/Flutter. As [amostras](samples/README.md)
organizam a revisão por linguagem.

A [paleta da interface](docs/interface-palette.md) registra as cores, seus papéis
e o contraste conferido sobre os fundos do tema.

1. Execute `npm ci` com Node.js 24. Abra o fork ou o workspace e pressione **F5**,
   escolhendo **Vyrion Two Dark: experimentar tema**. A tarefa compila o componente
   de decorações antes de abrir a janela.
2. A janela de desenvolvimento abre `samples/` com **Vyrion Two Dark** selecionado
   nas configurações dessa pasta. Se necessário, use **Preferences: Color Theme**.
3. Edite `themes/VyrionTwoDark-color-theme.json` no fork. As mudanças de cores são
   aplicadas ao vivo na janela de desenvolvimento.
4. Confira as linguagens afetadas entre Python, Rust, TypeScript, Go, C, C++ e
   Dart/Flutter, além dos componentes da interface afetados.
   Faça um commit pequeno para cada ajuste aprovado.

`colors` controla a interface e as cores registradas das caixas; `tokenColors`
contém regras TextMate.
`semanticTokenColors` pode ser acrescentado para regras semânticas específicas.
Use **Developer: Inspect Editor Tokens and Scopes** quando uma cor de código
não corresponder à regra esperada. As configurações pessoais de cores do VS Code
podem prevalecer sobre o tema.

As caixas funcionam com Python, Rust, TypeScript/TSX, JavaScript/JSX e Go, usando
as gramáticas instaladas. C, C++ e Dart conservam seus tipos de retorno: eles não
têm uma palavra equivalente a `def` nas declarações usuais. Veja as amostras
`samples/function-boxes.*`.

Para desativar somente as caixas, use `"vyrionTwoDark.functionBoxes.enabled": false`.
Elas também desaparecem ao selecionar outro tema. A instalação do VSIX já contém
o componente compilado; quem apenas usa o tema não precisa instalar Node/npm.

## Empacotar e instalar

Use Node.js 24 (versão de referência em `.node-version`) e npm. Dentro do fork:

```bash
npm ci
npm run package
npm run install:local
```

`package` cria `vyrion-two-dark.vsix`. `install:local` gera novamente o pacote e
o instala no VS Code local. Depois selecione **Vyrion Two Dark** em
**Preferences: Color Theme**. As mesmas operações estão em **Tasks: Run Task**.
O identificador da extensão é `t4lesss.vyrion-two-dark`.

O VSIX é para instalação local; este fluxo não publica no Marketplace.
O campo `publisher` identifica a extensão, sem declarar que há um publisher
registrado no Marketplace.

## Histórico e atualizações

O fork conserva o histórico Git original. `origin` aponta para
`t4lesss/vyrionTwoDark`; `upstream` aponta para `akamud/vscode-theme-onedark`.
Veja o [fluxo de desenvolvimento e atualização](docs/development.md) para criar
branches, incorporar upstream e reconstruir os dois checkouts em outra máquina.

## Créditos

Base: Atom One Dark, de Mahmoud Ali (akamud), inspirado no tema One Dark do Atom.
O histórico e a [licença MIT original](LICENSE) são preservados. O ícone herdado
também pertence ao projeto original; a identidade visual do fork poderá evoluir
em uma mudança posterior.
