# Interface em marfim e oliva — 0.2.2-dev.3

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

As cores vivem em `themes/VyrionTwoDark-color-theme.json`. A interface acompanha
o editor `#282C34`, a barra lateral `#21252B` e as demais superfícies da base.

| Papel | Cor | Uso |
| --- | --- | --- |
| Destaque dourado | `#EAD4AA` | Foreground geral, título da extensão e títulos da coluna de detalhes. |
| Marfim quente | `#EDE0C6` | Seções da barra lateral, abas ativas e barra de título. |
| Texto principal | `#E8E1D1` | Editor sem cor sintática específica, listas, campos, controles e terminal. |
| Texto secundário | `#CEC6B6` | Descrições, abas inativas, breadcrumbs e placeholders. |
| Texto discreto | `#ABA799` | Números de linha e foreground de elementos desativados. |
| Botão principal | `#6A6E23` | Verde da referência para ações principais e todos os botões da tela de extensões. |
| Hover principal | `#4B4F18` | Oliva mais escuro, perceptível ao passar o mouse. |
| Texto dos botões | `#FFFBF0` | Rótulos quase brancos nos botões principais e secundários. |
| Botão secundário | `#3F412A` | Variação escura para controles secundários comuns, fora da tela de extensões. |
| Hover secundário | `#2F311F` | Variação mais escura do botão secundário. |
| Borda dos botões | `#98A34F` | Contorno oliva mais luminoso. |
| Links / links ativos | `#98B09D` / `#B6CDBB` | Tom da segunda referência; inclui o link SIZE na página de extensões. |
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
| Título dourado sobre `#282C34` | 9,66:1 |
| Texto principal sobre `#282C34` | 10,75:1 |
| Texto secundário sobre `#282C34` | 8,25:1 |
| Botão principal normal / hover | 5,25:1 / 8,36:1 |
| Botão secundário normal / hover | 10,15:1 / 12,85:1 |
| Link normal / ativo sobre `#282C34` | 6,02:1 / 8,29:1 |

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

`npm run package` validou a tipagem e gerou o VSIX com as duas camadas de tema.
A base upstream e o componente de caixas não foram alterados. Estas medidas
cobrem as combinações indicadas; conforto de leitura continua sendo uma escolha
visual a ajustar com o uso. Não é uma auditoria de todos os tokens do tema.

Para outra iteração, ajuste um papel e seus estados relacionados, abra a página
da extensão e o Explorer com F5 e confira o texto, o hover e o foco. A aparência
dos widgets reais é a referência para decidir se a variação ficou clara.

Referência: [cores nativas do VS Code](https://code.visualstudio.com/api/references/theme-color).
