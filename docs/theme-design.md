# Organização das regras do tema

Este guia propõe a organização da camada pessoal do Vyrion Two Dark. O conjunto
de linguagens foi definido pelo usuário: Python, Rust, TypeScript, Go, C, C++ e
Dart/Flutter. A escolha das cores e estilos de cada papel ainda será feita
incrementalmente; os exemplos abaixo não foram aplicados ao tema.

## Começar pelo papel no código

A pergunta inicial é “o que quero distinguir durante a leitura?”. O escopo
TextMate é o endereço técnico usado para alcançar esse elemento. Linguagens
diferentes podem dar endereços diferentes ao mesmo papel, ou usar uma família
ampla de escopos para papéis distintos.

| Papel visual | Exemplos | Direção proposta |
| --- | --- | --- |
| Comentário e documentação | comentários, docstrings, documentação de API | Legibilidade com menos destaque que o código; documentação pode ter refinamento próprio. |
| Literais | strings, números, booleanos, valores nulos | Famílias consistentes entre linguagens; escapes e interpolação podem se distinguir. |
| Palavra de declaração | `def`, `fn`, `function`, `func`, `class` | Separar a palavra introdutória do nome que ela declara. Decidir se funções e tipos compartilham estilo. |
| Nome de função ou método | `fail`, `describe`, chamadas correspondentes | Um papel para o identificador; declaração e uso podem compartilhar cor. |
| Nome de tipo | classes, structs, enums, interfaces, tipos primitivos | Definir a relação entre tipos próprios e de biblioteca, sem confundir com palavras de declaração. |
| Valores e membros | variável, parâmetro, campo, propriedade, constante | Usar informação semântica quando disponível para distinções que a gramática não faz bem. |
| Fluxo de controle | `if`, `return`, `match`, laços, tratamento de erro | Estilo comum, com exceções deliberadas; `return` não pertence à família de declarações. |
| Modificadores | `async`, visibilidade, mutabilidade, `static` | Decidir o destaque como papel próprio, mesmo quando a gramática os agrupa com declarações. |
| Operadores e pontuação | `+`, `=`, `->`, vírgulas, parênteses | Evitar competição visual com identificadores; tratar operadores relevantes explicitamente. |
| Interface do editor | abas, seleção, cursor, painéis | Trabalhar em `colors`, separadamente das regras de tokens. |

Os nomes dos papéis acima são vocabulário de planejamento. Não são novos
seletores ou propriedades para inserir diretamente no JSON do VS Code.

## O caso concreto de `def`

Na imagem enviada, o inspetor mostra:

```text
storage.type.function.python   escopo mais específico do token
meta.function.python          contexto de função
source.python                 contexto da linguagem

Regra vencedora: storage.type
foreground: #ECECEC
fontStyle: bold
```

`def` é a palavra que introduz a função. O nome que vem depois, como `fail`, é
outro token. Uma regra para `entity.name.function` ou o tipo semântico `function`
é voltada ao nome, não à palavra `def`.

O seletor `storage.type` é amplo: também alcança, por exemplo, tipos numéricos
em Go e tipos primitivos em C/C++. Já `meta.function.python` cobre contexto de
função, não apenas `def`. Nenhum deles deve ser escolhido só para fazer uma
palavra ficar na cor desejada.

Na inspeção desta tarefa, a camada do fork estava vazia e a base continha uma
regra `storage` com cor `#C678DD`. Portanto, a regra branca/negrito mostrada na
imagem é uma referência fornecida pelo usuário; não foi localizada como regra
ativa desse arquivo do fork nem importada automaticamente.

Se a intenção for ajustar **somente `def` do Python**, a entrada em `tokenColors`
seria, por exemplo:

```json
{
  "name": "Python / Palavra de declaração de função",
  "scope": "storage.type.function.python",
  "settings": {
    "foreground": "#ECECEC",
    "fontStyle": "bold"
  }
}
```

Se a intenção for dar o mesmo estilo às **palavras que declaram funções nas
linguagens usadas**, mantenha um papel comum e mapeie os seletores observados:

```json
{
  "name": "Comum / Palavras de declaração de função",
  "scope": [
    "storage.type.function.python",
    "storage.type.function.ts",
    "keyword.other.fn.rust",
    "keyword.function.go"
  ],
  "settings": {
    "foreground": "#ECECEC",
    "fontStyle": "bold"
  }
}
```

Estas são alternativas, não duas regras para instalar juntas. A segunda é
comum pela intenção visual, embora liste endereços específicos de linguagens.
Ela cobre as formas explícitas examinadas; não declara cobertura automática de
TSX, arrow functions, lambdas, métodos ou todas as construções assíncronas.
O `async` do Python, por exemplo, recebeu `storage.type.function.async.python`.
Remover simplesmente `.python` ampliaria a seleção para construções que talvez
não devam compartilhar o estilo.

## Mapeamento inicial conferido

Estes resultados vieram de tokenização real das gramáticas TextMate embutidas
no VS Code 1.136.1, com o engine e o Oniguruma distribuídos pelo aplicativo.
Os exemplos e as pilhas completas estão em [token-scopes.json](token-scopes.json).
Outras gramáticas/extensões ou versões podem produzir resultados diferentes.

| Linguagem | Palavra de declaração de função | Escopo observado | Nome da função no exemplo |
| --- | --- | --- | --- |
| Python | `def` | `storage.type.function.python` | `entity.name.function.python` |
| Rust | `fn` | `keyword.other.fn.rust` | `entity.name.function.rust` |
| TypeScript | `function` | `storage.type.function.ts` | `entity.name.function.ts` |
| Go | `func` | `keyword.function.go` | `entity.name.function.go` |
| C | Não há palavra equivalente nessa forma | `int` é `storage.type.built-in.primitive.c` | `entity.name.function.c` |
| C++ | Não há palavra equivalente nessa forma | `int` inclui `storage.type.built-in.primitive.cpp` | `entity.name.function.definition.cpp` |
| Dart | Não há palavra equivalente nessa forma | `int` é `support.class.dart` | `entity.name.function.dart` |

Em `int fail(...)`, pinte `int` como tipo e `fail` como nome de função. A ausência
de uma palavra como `def` não é falta de suporte a C/C++/Dart. Flutter utiliza
Dart; widgets são classes/construtores e seus argumentos têm papéis próprios.

## Onde guardar cada decisão

Por enquanto, um único arquivo de personalizações é suficiente:

```text
themes/OneDark.json                    base upstream preservada
themes/VyrionTwoDark-color-theme.json   regras ativas do fork
docs/theme-design.md                   papéis, escolhas e critérios
docs/token-scopes.json                 exemplos observados, com versão
samples/                              material para conferir o resultado
```

Dentro do arquivo ativo:

- `colors`: interface do editor.
- `tokenColors`: regras TextMate, com `name` começando por `Comum /`, `Python /`,
  `Rust /`, `TypeScript /`, `Go /`, `C /`, `C++ /` ou `Dart /`.
- `semanticTokenColors`: tipos/modificadores semânticos; um seletor sem linguagem
  expressa uma intenção comum e `:python`, `:rust`, `:typescript`, `:go`, `:c`,
  `:cpp` ou `:dart` limita a uma linguagem. Esses IDs diferem dos sufixos TextMate
  `.ts` e `.cpp`.

Organize as entradas comuns antes das exceções para facilitar leitura. Essa
ordem não significa que a última regra vence sempre: especificidade e contexto
dos seletores importam, e a resolução ocorre por propriedade. Uma regra ampla
do fork pode perder para uma regra mais específica da base incluída.

O campo `name` serve para descrição, não muda a seleção. Evite blocos inventados
como `languages`, `palette` ou `global` no arquivo carregado pelo VS Code. O
`include` atual carrega um arquivo-base, não uma lista de módulos. Só vale criar
um gerador ou dividir fontes quando o volume tornar esse arquivo difícil de
manter; não é necessário agora.

## Tratar o realce semântico deliberadamente

TextMate conhece a estrutura reconhecida pela gramática. Um servidor de
linguagem pode distinguir, por exemplo, parâmetros, propriedades, constantes
e símbolos de biblioteca de modo mais preciso. As duas camadas precisam
expressar a mesma intenção de estilo.

Exemplos de seletores semânticos para entender a separação:

| Seletor | Intenção |
| --- | --- |
| `function` | Nomes classificados como função, nas linguagens que emitirem esse tipo. |
| `function:python` | Esses nomes em Python. |
| `function.declaration` | Nomes marcados como declaração; não a palavra `def`. |
| `parameter` | Identificadores classificados como parâmetros. |
| `variable.readonly` | Variáveis com o modificador semântico `readonly`. |

Não invente tipos do provedor: confira-os no inspetor. Na amostra Rust, TextMate
classificou o parâmetro `message` como `variable.other.rust`, demonstrando por
que nem toda distinção visual pode depender apenas de um escopo genérico.

A base e a camada atual não declaram `semanticHighlighting`. A ativação efetiva
também depende das configurações e dos provedores. A proposta é tratar o suporte
semântico como uma etapa explícita: inspecionar as linguagens, alinhar os estilos
e só então adotar `semanticHighlighting: true`. Durante essa etapa, comparar o
resultado com realce semântico ligado e desligado, em um workspace de teste.

## Ordem de trabalho proposta

1. **Inventariar os ajustes antigos.** Para cada regra, registrar papel, seletor,
   intenção de cor/estilo e um exemplo. Marcar se o objetivo é comum ou local.
2. **Definir a família de declarações.** Começar pelo caso `def` e seus
   correspondentes verificados; decidir separadamente nomes, tipos e modificadores.
3. **Ajustar os papéis comuns.** Comentários, literais, nomes, controle e operadores.
   Uma alteração de alcance comum deve ser conferida nas sete linguagens.
4. **Alinhar a camada semântica.** Usar os provedores reais dos projetos, sem
   presumir que a gramática embutida reproduz todas as extensões instaladas.
5. **Refinar particularidades.** Rust: lifetimes, macros e mutabilidade; TypeScript:
   tipos, propriedades, generics e decorators; Go: receivers, interfaces e ponteiros;
   C/C++: macros, ponteiros, templates e namespaces; Dart/Flutter: construtores,
   parâmetros nomeados, anotações, null safety e widgets; Python: decorators,
   docstrings, parâmetros, tipos e async.

Em cada passo, usar uma branch e um commit por intenção visual, F5 para preview
e as [amostras](../samples/README.md). Uma regra específica pode ser ampliada
depois que a equivalência estiver demonstrada; não precisa nascer universal.

Ficha curta para cada escolha:

```text
Papel: palavra de declaração de função
Intenção: [cor e estilo a decidir]
Alcance: [comum ou linguagens específicas]
Seletores observados: [...]
Exemplos que devem mudar: [...]
Exemplos que devem continuar distintos: tipos, nomes, async, lambdas, ...
Conferido com: [VS Code, gramática/provedor, realce semântico ligado/desligado]
```

As caixas coloridas da primeira imagem exigem investigação separada: o fundo
mostrado no inspetor não identifica por si só uma regra de fundo por token.
Decorações de extensões podem participar da aparência. O tema nativo controla
cores e estilos de texto, mas não oferece fundo arbitrário individual por token.

## Fontes

- [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
  — escopos, contexto, especificidade e inspetor.
- [Semantic Highlight Guide](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide)
  — tipos, modificadores, IDs de linguagem e ativação.
- [Schema nativo do tema](https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/themes/common/colorThemeSchema.ts)
  — propriedades de estilo e limite do fundo de tokens.
- `themes/OneDark.json` e `token-scopes.json` — regras e exemplos efetivamente
  examinados nesta tarefa. A base já contém regras gerais e várias linguagens.
