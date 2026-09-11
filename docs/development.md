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

## Versionamento com espaço para iterações

A série local atual é **`0.2.2-dev.N`**, iniciada em `0.2.2-dev.1`. O contador
avança enquanto refinamos o mesmo conjunto: `dev.2`, `dev.3`, `dev.1000` etc.
Não se aumenta minor ou patch a cada ajuste visual. Os commits preservam cada
mudança; uma nova versão identifica uma iteração que será instalada/distribuída.

```bash
npm run version:iteration
```

O comando usa `npm version prerelease --preid=dev --no-git-tag-version` e mantém
`package.json` e `package-lock.json` sincronizados. Partindo da série atual,
avança somente o contador. Atualize também `CHANGELOG.md`, revise e empacote.
Não crie tag/release do GitHub para cada experimento local.

| Etapa | Exemplo |
| --- | --- |
| Último marco estável já instalado | `0.2.1` |
| Refinamentos locais do próximo marco | `0.2.2-dev.1` → `0.2.2-dev.2` → `0.2.2-dev.1000` |
| Consolidação deliberada | `0.2.2` |
| Próximo ciclo, quando fizer sentido | `0.2.3-dev.1` |

Ao consolidar, use `npm version 0.2.2 --no-git-tag-version`. Para iniciar o ciclo
seguinte, escolha explicitamente `npm version 0.2.3-dev.1 --no-git-tag-version`;
depois retome `version:iteration`. Minor/major ficam para marcos maiores.

`0.2.1.1` e `0.2.1.1.2` são recusados pelo validador de versões do empacotador.
O manifesto exige [SemVer](https://code.visualstudio.com/api/references/extension-manifest).
Começamos em `0.2.2-dev.1` porque `0.2.1-dev.1` seria anterior ao `0.2.1` já
instalado. Metadados como `+rev.1` não mudam a precedência e não servem como
contador de atualização.

Este fluxo com sufixo foi verificado com VSIX local. O [Marketplace não aceita
sufixos SemVer de pré-lançamento](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#pre-release-extensions).
Para publicar futuramente, use um marco `major.minor.patch` adequado ao canal.
Nenhum comando de iteração ou instalação local publica no Marketplace.

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
commit. Node/npm compilam e empacotam o componente de decorações. O VSIX contém
JavaScript e WebAssembly para executar as caixas no VS Code desktop.

## Alterar as caixas

As cores ficam em `themes/VyrionTwoDark-color-theme.json`. O desenho e o lifecycle
ficam em `src/extension.ts`; o mapeamento de palavras/escopos fica em
`src/function-keywords.ts`. Veja o contrato em [theme-design.md](theme-design.md).
Mudanças nas cores recarregam ao vivo em F5. Para mudanças no componente, compile
e reinicie a sessão de depuração. `npm run package` sempre compila antes de empacotar.

Para executar os testes de gramática em um VS Code desktop com seus built-ins:

```bash
npm run compile
npm run compile:tests
code --new-window --user-data-dir "$PWD/.vscode-test/manual/user" \
  --extensions-dir "$PWD/.vscode-test/manual/extensions" \
  --disable-workspace-trust --skip-welcome --skip-release-notes \
  --extensionDevelopmentPath="$PWD" \
  --extensionTestsPath="$PWD/.vscode-test/compiled/smoke.js"
```

O log da janela deve conter `VYRION_BOXES_PASS`. A saída do launcher sozinha não
confirma os testes. `VYRION_TEST_OUTPUT` pode apontar para uma pasta local para
gravar o resultado JSON. Em F5, confira também as quatro amostras
`function-boxes.*`, troque de tema, desative a opção e abra/feche uma string
multilinha antes de uma função. As caixas devem acompanhar essas mudanças.
