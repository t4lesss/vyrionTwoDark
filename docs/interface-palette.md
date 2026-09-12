# Interface em marfim e oliva — 0.2.2-dev.12

Em `dev.12`, os contadores Installed e Recommended usam `#2E9CA0` por
`badge.background`. Essa chave é compartilhada com outros contadores comuns;
não existe uma cor nativa exclusiva dessas duas seções. Os badges dos ícones
na barra de atividades usam `activityBarBadge.background`, que continua
herdando `#528BFF` da base, independentemente dos contadores. O texto de ambos
continua `#D7DAE0`.

Em `dev.11`, as estrelas de avaliação das extensões usam `#F99551`, por meio
de `extensionIcon.starForeground`. É uma cor própria dos ícones de avaliação.

Em `dev.10`, o código em linha, como `Pick Color`, usa `#DDC184`, ligeiramente
mais luminoso que o padrão nativo `#D7BA7D`. Os títulos mantêm suas cores.
O link `Convert Color` e SIZE já têm o mesmo foreground `#9FC6B1`: a aparência
difere porque o primeiro é código monoespaçado sobre fundo translúcido branco
de 10%, enquanto SIZE é um link sem essa caixa. Ambos foram preservados.

As abas ativas de painéis, incluindo o cabeçalho Chat/Codex, agora acompanham
`#3B413E` do editor por `modernTab.activeBackground`. Essa chave nativa também
alcança outras abas de painéis e as abas de Settings; não há seletor de cor
exclusivo do cabeçalho Codex. `modernActivityBarItem.activeBackground` fixa o
valor anterior `#495E55` para preservar o destaque dos ícones da barra de
atividades, que herdaria a nova cor. O hover e as seleções de listas continuam iguais.

**Correção em dev.9:** a imagem do usuário mostra abas arredondadas da interface
moderna. O alvo é o fundo da aba ativa, controlado por
`modernEditorTab.activeBackground`, agora `#3B413E`. As verificações anteriores
de `tab.activeBorderTop` cobriam a linha do estilo antigo, não esse preenchimento.
Ao conferir abas, reproduza o estilo da janela do usuário no perfil de teste.

A referência do usuário foi o cabeçalho da tela de extensões: texto quente,
iluminado e legível, sem branco puro ou amarelo intenso. Na revisão, ele pediu
um pouco mais de calor nos títulos e mais amarelo/intensidade no oliva.
No ajuste seguinte, pediu o verde exato dos botões da referência e rótulos mais
claros. A amostragem da região interna de ambos os botões principais encontrou
`#6A6E23` como cor dominante; os rótulos tinham `#EBDBB2`. A paleta agora usa esse
verde com rótulos `#FFFBF0`.

Na revisão `dev.3`, o hover escurece, o checkbox acompanha os botões e os links
usam `#98B09D`, cor dominante do texto da segunda referência. É um tom frio,
acinzentado, com componente verde; preservamos a amostra escolhida pelo usuário.
Os títulos dos detalhes recebem dourado suave por meio do foreground geral.

Em `dev.4`, o usuário pediu menos intensidade nos títulos grandes. O foreground
passa a `#E5D7BC`, um marfim com dourado menos saturado. Os mantenedores da lista
usam `descriptionForeground`, agora `#ADA89B`; as descrições acompanham a mudança.
Na linha selecionada, o CSS nativo volta a usar a cor da seleção para ambos.

Em `dev.5`, os links ganham luminosidade e saturação moderadas: `#9FC6B1` no
estado normal e `#BEDDCC` no hover. O menu vertical de Features usa as cores
nativas de listas: hover `#3D4535`, seleção/foco `#555F2B`, texto `#FFFBF0` e
contorno de foco `#98A34F`. A seleção conserva o fundo quando o menu perde foco.
Essas regras também afetam outras listas, incluindo Explorer e extensões;
o VS Code não expõe um conjunto de cores exclusivo desse menu.

Em `dev.6`, o usuário escolheu o tom secundário para o menu: hover `#364B43`,
seleção/foco `#446356` e contorno `#9FC6B1`. São variações escuras da cor dos
links. Ele esclareceu que a aba a desaturar era a do topo do VS Code:
`tab.activeBorderTop` usa `#A4AD8E`, verde acinzentado. Essa cor pertence às abas
do editor e não modifica o foco geral, os botões ou a navegação Details/Features.

Em `dev.7`, a saturação HSL das cores do menu foi reduzida em aproximadamente
30%, preservando matiz e luminosidade: hover `#394842`, seleção `#495E55` e
contorno `#A5C0B1`. Os links e a faixa da aba conservam suas cores anteriores.

As cores vivem em `themes/VyrionTwoDark-color-theme.json`. A interface acompanha
o editor `#282C34`, a barra lateral `#21252B` e as demais superfícies da base.

| Papel | Cor | Uso |
| --- | --- | --- |
| Marfim dourado suave | `#E5D7BC` | Foreground geral, título da extensão e títulos da coluna de detalhes. |
| Marfim quente | `#EDE0C6` | Seções da barra lateral, abas ativas e barra de título. |
| Texto principal | `#E8E1D1` | Editor sem cor sintática específica, listas, campos, controles e terminal. |
| Texto secundário | `#CEC6B6` | Abas inativas, breadcrumbs e placeholders. |
| Descrições e mantenedores | `#ADA89B` | Descrições gerais e nome do mantenedor na lista de extensões sem seleção. |
| Texto discreto | `#ABA799` | Números de linha e foreground de elementos desativados. |
| Botão principal | `#6A6E23` | Verde da referência para ações principais e todos os botões da tela de extensões. |
| Hover principal | `#4B4F18` | Oliva mais escuro, perceptível ao passar o mouse. |
| Texto dos botões | `#FFFBF0` | Rótulos quase brancos nos botões principais e secundários. |
| Botão secundário | `#3F412A` | Variação escura para controles secundários comuns, fora da tela de extensões. |
| Hover secundário | `#2F311F` | Variação mais escura do botão secundário. |
| Borda dos botões | `#98A34F` | Contorno oliva mais luminoso. |
| Links / links ativos | `#9FC6B1` / `#BEDDCC` | Variação mais luminosa e saturada da referência; inclui SIZE. |
| Código em linha | `#DDC184` | Dourado discretamente mais luminoso em trechos como `Pick Color`. Links formatados como código conservam a cor dos links. |
| Estrelas de avaliação | `#F99551` | Ícones de avaliação das extensões (`extensionIcon.starForeground`). |
| Contadores comuns | `#2E9CA0` | Installed, Recommended e outros badges que usam `badge.background`. |
| Badges da barra de atividades | `#528BFF` | Contadores nos ícones laterais; cor independente herdada da base. |
| Hover de listas | `#394842` | Variação escura e menos saturada do tom secundário. |
| Seleção / foco de listas | `#495E55` | Tom secundário mais marcado no item ativo, mesmo sem foco no menu. |
| Texto / contorno de listas em destaque | `#FFFBF0` / `#A5C0B1` | Texto claro e contorno secundário suavizado. |
| Linha superior da aba ativa | `#858B8080` | Verde escuro e acinzentado com cerca de 50% de opacidade, específico das abas do editor. |
| Fundo das abas ativas modernas | `#3B413E` | Cinza escuro, levemente esverdeado, no editor e nas abas de painéis como Chat/Codex. |
| Ícone ativo da barra de atividades | `#495E55` | Preserva o destaque anterior independentemente do fundo das abas. |
| Foco | `#AABD73` | Identificação do controle que recebe o teclado. |

O título da extensão e Installation, Marketplace, Categories e Resources não
têm uma cor nativa independente no VS Code 1.136.1. Eles herdam `foreground`,
assim como a descrição principal e os metadados. O destaque escolhido é cromático:
dourado suave, com os tamanhos e espaçamentos nativos. Também aquece outros
rótulos que herdam essa cor; não é um estilo exclusivo dos títulos. As cores
explícitas dos demais componentes preservam o marfim e o texto principal.
Não há CSS injetado nem alteração de fontes ou bordas desses títulos.

`button.*` estiliza os controles comuns; `extensionButton.*` cobre os controles
da tela de extensões. A distinção é necessária porque a base tem regras próprias
para botões proeminentes. Por correção explícita do usuário em `dev.2`, tanto
`extensionButton.background` quanto `extensionButton.prominentBackground` usam
o verde de `button.background`; o mesmo vale para o hover. Ações como Set Color
Theme, Disable e Uninstall devem compartilhar esse verde, sem receber o tom
escuro de `button.secondaryBackground`.
As caixas de seleção usam o mesmo `#6A6E23` dos botões, marca `#FFFBF0` e
contorno `#98A34F`, nos estados marcado e desmarcado. Estados desativados ainda podem receber opacidade
adicional do próprio VS Code.

## Contraste e conferência

Razões calculadas pela luminância relativa sRGB, com cores opacas:

| Combinação | Contraste |
| --- | ---: |
| Título em marfim dourado sobre `#282C34` | 9,85:1 |
| Texto principal sobre `#282C34` | 10,75:1 |
| Texto secundário sobre `#282C34` | 8,25:1 |
| Descrição sobre `#282C34` / mantenedor sobre `#21252B` | 5,90:1 / 6,49:1 |
| Botão principal normal / hover | 5,25:1 / 8,36:1 |
| Botão secundário normal / hover | 10,15:1 / 12,85:1 |
| Link normal / ativo sobre `#282C34` | 7,46:1 / 9,60:1 |
| Texto de lista em hover / seleção | 9,32:1 / 6,73:1 |

Na imagem de referência, a combinação dominante do rótulo/fundo era 3,96:1.
Clarear o rótulo eleva esse contraste mantendo o verde principal exato.

Em 10 de setembro de 2026, VS Code desktop 1.136.1 carregou o VSIX 0.2.1
instalado em um perfil isolado. A leitura do renderer confirmou as cores do
título e da descrição na página da extensão, ações secundárias normais/hover,
botões principais normais/hover no Explorer e as cores do editor. As capturas
das três telas foram examinadas; as três caixas `def` da amostra continuaram
presentes. O foco visível foi observado no Explorer. Logs, valores computados e
capturas locais estão em `.vscode-test/interface/`, ignorados pelo Git.

A revisão `0.2.2-dev.1` tem sua conferência e capturas em
`.vscode-test/buttons-reference/`. Esse diretório também guarda o ensaio isolado
do comando de versão (`dev.1` → `dev.2`), sem consumir uma iteração do projeto.
O VS Code 1.136.1 aceitou a instalação local com esse sufixo e exibiu a versão
na página da extensão. Os botões reais confirmaram o verde e os rótulos novos,
incluindo hover de ações principais e secundárias; as três caixas da amostra
Python continuaram presentes.

A correção `0.2.2-dev.2` foi conferida no mesmo VS Code: Set Color Theme,
Disable e Uninstall apresentaram o mesmo fundo e texto do botão Open Folder.
O hover de Set Color Theme também coincidiu com o de Open Folder. A captura
da tela de extensões foi examinada, e as três caixas Python permaneceram
presentes. Resultados e capturas estão em `.vscode-test/extension-buttons/`.

A revisão `0.2.2-dev.3` foi instalada em perfil isolado no VS Code 1.136.1.
O renderer confirmou o hover escuro de Set Color Theme, Disable, Uninstall,
Install, Open Folder e Clone Repository; a marcação/desmarcação real do checkbox;
o tom de SIZE e seu hover; e a cor dos quatro títulos pedidos, nas páginas do
fork instalado e do Atom One Dark no Marketplace. As capturas foram examinadas
e as três caixas Python continuam presentes. Evidência local em
`.vscode-test/hover-links-details/`. A página do Marketplace foi apenas aberta
para conferência, sem instalar ou publicar outra extensão.

Em `0.2.2-dev.4`, foram examinados o título grande, os títulos de detalhes e
o mantenedor real Mahmoud Ali na lista. O renderer confirmou `#E5D7BC` nos
títulos e `#ADA89B` no mantenedor/descrição normal e em hover, preservando
`#E8E1D1` no nome da extensão. A seleção foi conferida separadamente: ela
reaplica a mesma cor clara aos três textos, como determina o CSS nativo.
Capturas e resultados em `.vscode-test/soft-titles-publishers/`.

Em `0.2.2-dev.5`, o menu real de Features da extensão JavaScript/TypeScript
confirmou hover em Commands, seleção com contorno, Settings em hover enquanto
Commands permanecia ativo e seleção preservada após perder foco. SIZE normal
e em hover foi conferido na página do fork. Capturas examinadas e resultados
em `.vscode-test/features-menu-links/`. A coleta lê o rótulo visível do item,
pois o DOM também contém textos de estado ocultos.

Em `0.2.2-dev.6`, o renderer confirmou hover/seleção no tom secundário, contorno
correspondente e seleção preservada sem foco. A faixa real no topo da aba ativa
usa `#A4AD8E`, enquanto `focusBorder` continua `#AABD73`. SIZE normal/hover
permaneceu nas cores anteriores. Capturas examinadas e resultados em
`.vscode-test/secondary-menu-tab/`.

A revisão `0.2.2-dev.7` confirmou os estados reais do menu, a seleção sem foco,
SIZE e a faixa da aba. Captura examinada e resultados em
`.vscode-test/secondary-menu-soft/`.

Em `dev.8`, somente `tab.activeBorderTop` mudou na paleta. A comparação integral
do tema confirmou o escopo, e o renderer mostrou `rgba(133, 139, 128, 0.5)` na
faixa da aba. Captura e conferência em `.vscode-test/active-tab-muted/`.

Em `dev.9`, o perfil isolado ativou `workbench.experimental.modernUI` para
reproduzir as abas da imagem. A versão `dev.8` mostrou o fundo real `#495E55`;
`dev.9` mostrou `#3B413E`. A aba inativa, o texto, o hover e as cores compartilhadas
de listas, links e botões permaneceram iguais. Só
`modernEditorTab.activeBackground` foi acrescentado à paleta. Antes/depois e
resultados em `.vscode-test/modern-active-tab/`.

Em `dev.10`, o VSIX foi conferido no VS Code 1.137.0 com a interface moderna.
A página real de Color Picker mostrou `Convert Color` e SIZE em `#9FC6B1`,
antes e depois; `Pick Color` e `Alt + C P` passaram de `#D7BA7D` a `#DDC184`.
O preenchimento nativo da aba Chat passou de `#495E55` para `#3B413E`, igual
ao editor. Foram comparados os títulos, a aba inativa e as cores compartilhadas
de links, botões, listas e ícones da barra de atividades. Capturas antes/depois
examinadas e resultados locais em `.vscode-test/inline-chat/`. O cabeçalho foi
validado com a aba nativa Chat; Codex usa o mesmo controle de abas do painel.

Em `dev.11`, a página real de Color Picker no VS Code 1.137.0 confirmou
`#F99551` nas estrelas cheias e na meia estrela, antes em `#FF8E00`. Os contornos
vazios conservam o estilo nativo. O JSON mudou somente nessa propriedade;
capturas antes/depois e leitura do renderer estão em `.vscode-test/extension-stars/`.

`npm run package` validou a tipagem e gerou o VSIX com as duas camadas de tema.
Em `dev.12`, Installed e Recommended no VS Code 1.137.0 carregaram
`#2E9CA0`. A leitura dos elementos nativos da barra de atividades confirmou
`#528BFF`, com texto de ambos preservado em `#D7DAE0`. O JSON alterou somente
`badge.background`; botões, links e abas conservaram suas cores. Capturas
antes/depois examinadas e valores computados em `.vscode-test/count-badges/`.

A base upstream e o componente de caixas não foram alterados. Estas medidas
cobrem as combinações indicadas; conforto de leitura continua sendo uma escolha
visual a ajustar com o uso. Não é uma auditoria de todos os tokens do tema.

Para outra iteração, ajuste um papel e seus estados relacionados, abra a página
da extensão e o Explorer com F5 e confira o texto, o hover e o foco. A aparência
dos widgets reais é a referência para decidir se a variação ficou clara.

Referência: [cores nativas do VS Code](https://code.visualstudio.com/api/references/theme-color).
