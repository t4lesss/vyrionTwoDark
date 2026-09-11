# Organização das regras do tema

O tema é organizado por **papel no código**. A primeira escolha adotada é:
a palavra que introduz uma função recebe o mesmo estilo em cada linguagem.
O usuário definiu Python, Rust, TypeScript, Go, C, C++ e Dart/Flutter como
prioridades e especificou fundo quase branco, letras verdes e cantos arredondados.

## Regra adotada na versão 0.2.0

| Papel | Aparência | Exemplos |
| --- | --- | --- |
| Palavra introdutória de função | Fundo `#F2F5E8`, texto `#5F7A32` em negrito, cantos de 5 px | `def`, `fn`, `function`, `func` |

O papel é comum; os endereços dos tokens variam. A aparência é definida uma vez.
Adicionar outra linguagem exige mapear sua palavra e observar sua gramática.
A cobertura não é automaticamente universal.

| Linguagem | Palavra | Escopo TextMate da palavra |
| --- | --- | --- |
| Python | `def` | `storage.type.function.python` |
| Rust | `fn` | `keyword.other.fn.rust` |
| TypeScript | `function` | `storage.type.function.ts` |
| TypeScript com JSX | `function` | `storage.type.function.tsx` |
| JavaScript | `function` | `storage.type.function.js` |
| JavaScript com JSX | `function` | `storage.type.function.js.jsx` |
| Go | `func` | `keyword.function.go` |
| C, C++, Dart/Flutter | Sem palavra equivalente nas declarações usuais | Nenhuma caixa para o tipo de retorno |

`async def`, `async fn` e `async function` recebem a caixa somente na palavra
introdutória. Métodos Python/Go que usam `def`/`func` também a recebem. Nomes de
função, `async`, setas, lambdas e tipos têm papéis próprios. Expressões anônimas
com `function` ou `func` também introduzem funções; o reconhecimento acompanha
o escopo da palavra, sem exigir um nome seguinte. Formas de tipo que reutilizam
essa palavra e esse escopo também compartilham o estilo.

Em `int help(...)`, `int` continua sendo tipo e `help` continua sendo nome de
função. Flutter utiliza Dart: `build` é um nome de método e `Widget` é um tipo.
A ausência de uma caixa nessas declarações é intencional.

## Por que o caso do inspetor não vira uma regra ampla

O `def` mostrado pelo usuário tinha `storage.type.function.python`; uma regra
`storage.type` fornecia texto branco em negrito. Essa família também alcança
outros papéis, inclusive tipos primitivos de algumas linguagens. Já
`entity.name.function` e o tipo semântico `function` descrevem nomes.

A regra branca/negrito da imagem não foi localizada como configuração ativa do
fork. A aparência foi reconstruída pela intenção visual esclarecida pelo usuário.
O tema nativo não oferece fundo arbitrário individual por token; o componente
do fork usa a API pública `createTextEditorDecorationType` / `setDecorations`.
O fundo exibido pelo inspetor de tokens não identifica essa decoração.

## Onde editar

| Arquivo | Responsabilidade |
| --- | --- |
| `themes/OneDark.json` | Base upstream preservada. |
| `themes/VyrionTwoDark-color-theme.json` | Cores próprias, regras TextMate e futuras regras semânticas. |
| `src/function-keywords.ts` | Papel de função: palavras, escopos e cache de tokenização. |
| `src/extension.ts` | Forma da caixa, aplicação, configurações e eventos do editor. |
| `src/grammars.ts` | Leitura das gramáticas contribuídas pelas extensões instaladas. |
| `package.json` | Configuração e registro das cores para o VS Code. |
| `samples/function-boxes.*` | Exemplos visuais da regra adotada. |
| `tests/smoke.ts` | Casos com gramáticas reais e edições que alteram o contexto. |

As três cores registradas têm o prefixo `vyrionTwoDark.functionBox`: `Background`,
`Foreground` e `Border`. Seus valores no tema são a paleta ativa. Os defaults do
manifesto servem quando a cor não é fornecida pelo tema; mantenha-os coerentes
quando mudar a paleta. O usuário também pode sobrescrevê-las em
`workbench.colorCustomizations`.

A opção `vyrionTwoDark.functionBoxes.enabled`, inicialmente `true`, permite
remover as caixas sem trocar de tema. O componente só aplica a regra com
Vyrion Two Dark selecionado. O VSIX inclui JavaScript, TextMate e Oniguruma/WASM;
não depende do checkout irmão, de CSS modificado nem de extensão de terceiros.
Os avisos das dependências estão em `THIRD_PARTY_NOTICES.md`.

## Reconhecimento e limites

O componente lê as contribuições de gramática pela API pública, sem importar
arquivos internos do aplicativo. Ele verifica a palavra inteira e o escopo mais
interno do token. A gramática preserva o contexto entre linhas, evitando caixas
em strings, comentários e texto JSX. Uma edição invalida o cache a partir da
primeira linha afetada, inclusive quando abre ou fecha uma string multilinha.

A leitura é feita apenas para documentos visíveis, até a região exibida mais uma
pequena margem, preservando o estado desde o início do arquivo. O cache descarta
documentos que saem da tela; o processamento cede tempo ao host e cancela trabalho
quando o documento muda. Uma linha acima de 20.000 caracteres ou uma tokenização
que ultrapasse seu orçamento interrompe as caixas dali em diante, sem inventar
um estado para as linhas seguintes. Isso pode limitar caixas em arquivos enormes
ou com gramáticas muito custosas; as cores normais continuam funcionando.

A seleção de gramática usa as contribuições expostas pelo host. Se mais de uma
extensão contribuir para a mesma linguagem/escopo, a última encontrada prevalece;
a API pública não expõe a gramática efetivamente escolhida pelo renderer. Uma
extensão que substitua a gramática pode exigir um novo mapeamento e validação.
A gramática é recarregada quando o conjunto de extensões muda. A verificação atual
cobre VS Code desktop 1.136.1 e gramáticas embutidas; o pacote não declara entrada
para VS Code Web. A tokenização não depende de servidor de linguagem.

## Próximas famílias, incrementalmente

| Papel | Direção para uma próxima iteração |
| --- | --- |
| Declaração de tipo | Mapear `class`, `struct`, `interface`, `enum`; definir aparência própria. |
| Fluxo de controle | Tratar `return`, condições, laços e erros como papel separado. |
| Nomes de funções e tipos | Alinhar TextMate e informação semântica dos provedores. |
| Valores e membros | Distinguir parâmetros, campos, propriedades e constantes quando houver informação. |
| Comentários e literais | Ajustar legibilidade e famílias de cores entre linguagens. |
| Particularidades | Refinar macros/lifetimes em Rust, templates em C++, widgets em Dart, entre outros. |

Essas famílias ainda não receberam regras próprias novas. A base já oferece
realce para várias linguagens. `semanticHighlighting` permanece sem alteração;
ativá-lo e alinhar `semanticTokenColors` merece uma etapa com os provedores reais.
`function.declaration` continua significando o nome declarado, não a palavra `def`.

Para cada nova família: escolher o papel, observar os tokens, adicionar exemplos,
aplicar uma regra comum, validar as linguagens afetadas e registrar um commit.
Só criar uma exceção quando a linguagem ou o provedor justificar uma diferença.
Não é necessário um gerador de temas ou vários arquivos de paleta neste estágio.

## Referências e verificação

- [Mapa inicial dos escopos](token-scopes.json): exemplos reais anteriores à implementação.
- [Verificação das caixas](function-boxes-verification.md): execução e limites da versão 0.2.0.
- [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide).
- [Semantic Highlight Guide](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide).
- [DecorationRenderOptions](https://code.visualstudio.com/api/references/vscode-api#DecorationRenderOptions).
- [Cores contribuídas](https://code.visualstudio.com/api/references/contribution-points#contributes.colors).
