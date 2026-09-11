# Desenvolvimento incremental

Execute os comandos Git e npm abaixo dentro de `modificado/`, salvo quando
outro diretório estiver indicado. Confirme `git status --short` antes de começar.

Antes de escolher o seletor de uma nova regra, identifique seu papel e alcance
no [planejamento do tema](theme-design.md). O guia distingue regras comuns,
exceções por linguagem e realce semântico.

## Ajuste cotidiano

```bash
git switch main
git pull --ff-only origin main
git switch -c ajuste/contraste-comentarios
```

Edite `themes/VyrionTwoDark-color-theme.json`. Use F5 para abrir a janela de
desenvolvimento e conferir os arquivos em `samples/`. Comece com uma mudança
por vez: comentários, seleção, abas ou um conjunto de tokens relacionado.

```bash
git diff --check
git diff -- themes/VyrionTwoDark-color-theme.json
npm run package
git add themes/VyrionTwoDark-color-theme.json
git commit -m "Improve comment contrast"
git switch main
git merge --ff-only ajuste/contraste-comentarios
git push origin main
```

Se `--ff-only` rejeitar a integração porque `main` avançou, retorne à branch de
ajuste e integre `main` nela; resolva os conflitos e revise antes de tentar de
novo. Nunca use force push para resolver esse caso. Use nomes novos para cada
ajuste posterior.

Para instalar uma iteração aprovada no VS Code de uso cotidiano:

```bash
npm run install:local
```

Para uma nova versão distribuível, atualize `CHANGELOG.md` e use, por exemplo,
`npm version patch --no-git-tag-version`. Isso mantém `package.json` e
`package-lock.json` sincronizados. Revise, empacote e faça o commit da versão;
tags e releases são criadas quando houver uma versão que mereça ser marcada.

## Atualizar a base original

O checkout `origem/` continua fixado até a atualização ser aprovada.
Os exemplos seguintes buscam a ponta atual de `upstream/master`; confira os
commits antes de decidir se quer adotá-la ou escolher uma revisão intermediária.

```bash
git switch main
git pull --ff-only origin main
git fetch upstream
git log --oneline main..upstream/master
git rev-parse upstream/master
git switch -c atualizacao/upstream
git merge --no-ff --no-commit upstream/master
```

Se não houver commits novos, encerre o procedimento sem criar uma atualização
vazia. Caso haja conflitos, resolva-os na branch de atualização. Preserve a
identidade `t4lesss.vyrion-two-dark`, os scripts do fork e sua camada de ajustes.
Use `git merge --abort` para desistir de um merge ainda em andamento.

Registre em `UPSTREAM.md` o commit upstream escolhido, sua versão e o SHA-256
do arquivo-base atualizado. Revise `themes/OneDark.json` e a interação com suas
regras TextMate e semânticas; regras mais específicas podem ter precedência
sobre regras genéricas mesmo quando vêm da base.

Se o merge alterar dependências, sincronize `package-lock.json` antes de
empacotar. Confira o tema com F5 e revise `git diff --cached` e `git diff`.

```bash
git diff --check
npm run package
git add UPSTREAM.md
git commit -m "Merge reviewed Atom One Dark updates"
git switch main
git merge --ff-only atualizacao/upstream
git push origin main
```

Inclua explicitamente no commit os demais arquivos resolvidos/ajustados. Se
`main` avançar, integre-a na branch de atualização e revise novamente antes de
promover. Use nomes novos para as branches em cada atualização posterior.

Após a aprovação, confirme que `origem/` está limpa e atualize sua referência:

```bash
git -C ../origem status --short
git -C ../origem fetch origin
git -C ../origem switch --detach COMMIT_ADOTADO
```

Substitua `COMMIT_ADOTADO` pelo hash registrado em `UPSTREAM.md`. Se houver
alterações locais na referência, pare e preserve-as antes de trocar a revisão.
Esse checkout é consultivo; a configuração local bloqueia push para upstream.

## Recriar os dois checkouts

Em uma pasta nova, usando Git, Node.js 24, npm e o comando `code`:

```bash
mkdir vyrionTwoDark
cd vyrionTwoDark
git clone https://github.com/akamud/vscode-theme-onedark.git origem
git clone https://github.com/t4lesss/vyrionTwoDark.git modificado
git -C modificado remote add upstream https://github.com/akamud/vscode-theme-onedark.git
git -C origem config remote.origin.pushurl DISABLED
git -C modificado config remote.upstream.pushurl DISABLED
git -C modificado config remote.pushDefault origin
git -C modificado config pull.ff only
git -C modificado config push.default simple
```

Leia o commit adotado no `modificado/UPSTREAM.md` recém-clonado e aplique-o:

```bash
git -C origem switch --detach COMMIT_ADOTADO
cd modificado
npm ci
code vyrionTwoDark.code-workspace
```

`origem/` pode ser recriado sem perder suas mudanças, que vivem no fork. O arquivo
de workspace usa caminhos relativos e abre os dois repositórios separadamente.
Em uma máquina nova, configure também sua identidade Git antes do primeiro
commit. Node/npm são ferramentas de empacotamento; o tema não executa JavaScript.
