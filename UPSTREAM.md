# Base upstream adotada

- Repositório: https://github.com/akamud/vscode-theme-onedark
- Branch de acompanhamento: `master`
- Versão de origem: `2.3.0`
- Commit adotado: `775995b48190b9d852aafebf2dd7c692163e9600` (`Release 2.3.0`)
- Arquivo-base: `themes/OneDark.json`
- SHA-256: `9cba08f30e9f249ed5d00a33a582533cc611d9360e61973dcaddcad3f7ac8d7c`
- Licença: MIT; conservar `LICENSE` e os créditos de origem.

Na preparação inicial, o arquivo-base foi comparado byte a byte com o tema
instalado Atom One Dark 2.3.0. O arquivo do fork começou com `include` para essa
base e sem regras próprias de cores, tokens ou realce semântico.

O checkout irmão `origem/` fica em detached HEAD neste commit. Ele representa a
base adotada, não necessariamente a ponta atual de upstream/master.
O fork contém sua própria cópia versionada da base e não carrega arquivos da
pasta irmã durante execução ou empacotamento.

Atualize este registro no mesmo commit que adotar uma nova base. O procedimento
está em [docs/development.md](docs/development.md#atualizar-a-base-original).
