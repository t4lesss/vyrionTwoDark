# Amostras para revisão visual

Abra esta pasta pela configuração F5 do Vyrion Two Dark. As amostras servem para
comparar a aparência, não formam um único projeto compilável. Alguns exemplos
herdados dependem de projetos externos ou misturam fragmentos.

| Linguagem | Arquivo | O que conferir |
| --- | --- | --- |
| Python | [sample-vyrion.py](sample-vyrion.py) | `def`, nome, parâmetro, anotação, decorator, docstring, async. |
| Rust | [sample.rs](sample.rs) | `fn`, nomes, tipos, lifetime, referência, macro. |
| TypeScript | [sample.ts](sample.ts), [sample2.ts](sample2.ts) | `function`, tipos, nomes, propriedades, classes e chamadas. |
| Go | [sample.go](sample.go) | `func`, tipos, interfaces, parâmetros e controle. |
| C | [sample-vyrion.c](sample-vyrion.c) | Tipo de retorno, nome de função, parâmetros, struct, macro e ponteiro. |
| C++ | [sample-vyrion.cpp](sample-vyrion.cpp) | Tipo de retorno, nome, classe, template, namespace e referência. |
| Dart | [sample-vyrion.dart](sample-vyrion.dart) | Nome de função, tipo, construtor, parâmetro nomeado, enum e async. |
| Flutter | Um arquivo representativo do seu projeto Flutter | Construtores de widgets, `build`, argumentos nomeados, callbacks e anotações. |

Para realce semântico, confira também um projeto real com o provedor de linguagem
ativo. Estas amostras não provisionam Rust Analyzer, gopls, clangd, Dart/Flutter SDK
ou qualquer outro servidor/SDK. Um nome que parece parâmetro para uma pessoa
pode ser apenas uma variável para a gramática TextMate; use o inspetor.

Quando uma regra é comum, confira o elemento que deve mudar e pelo menos um
elemento próximo que deve continuar distinto: `def` versus nome/tipo/`async`,
`fn` versus macro/tipo, `func` versus tipo numérico, tipo de retorno versus nome
da função em C/C++/Dart.

O planejamento fica em [docs/theme-design.md](../docs/theme-design.md).

Para a regra adotada na versão 0.2.0, abra `function-boxes.py`, `function-boxes.rs`,
`function-boxes.ts` e `function-boxes.go`. As palavras introdutórias devem ter o
mesmo fundo claro e texto verde; suas ocorrências em comentários e strings
conservam o estilo correspondente. `async`, nomes, tipos, `class` e `return`
continuam com seus papéis separados.
