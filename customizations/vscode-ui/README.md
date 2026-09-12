# Tipografia pessoal do VS Code

Configuração visual escolhida: IBM Plex Sans na interface, título principal da
extensão em Bold 700 e títulos de seção em SemiBold 600. Editor e terminal usam
JetBrains Mono pelas configurações pessoais do VS Code.

Esta personalização é separada do VSIX do tema. O VS Code 1.137.0 não oferece
uma configuração geral de fonte/peso para esses componentes; o instalador
aplica somente as folhas desta pasta aos recursos nativos do aplicativo Linux.
As fontes precisam estar instaladas no sistema do usuário.

## Aplicar e restaurar

Use o Python externo com Typer. Primeiro prepare um diretório novo e durável
para os originais, os arquivos alterados e o manifesto de hashes:

```bash
"$PYTHO_VENV/bin/python" customizations/vscode-ui/install.py prepare \
  "$HOME/.local/share/vyrion-two-dark/ui-backups/vscode-1.137.0"
```

O preparo não modifica a instalação. Revise os arquivos `original/`, `patched/`
e `manifest.json`. A aplicação exige autenticação do sistema quando os arquivos
em `/usr/share/code/resources/app` pertencem a root:

```bash
pkexec "$PYTHO_VENV/bin/python" "$PWD/customizations/vscode-ui/install.py" apply \
  "$HOME/.local/share/vyrion-two-dark/ui-backups/vscode-1.137.0"
```

Recarregue as janelas do VS Code para carregar os recursos novos. Para desfazer,
use o mesmo comando com `restore` no lugar de `apply`, seguido de recarga.
Conserve o diretório de backup. Não há alteração nas configurações pessoais,
nos arquivos de extensões ou nas cores do tema.

## Alcance e manutenção

- `workbench.css` acrescenta a família da interface e os pesos de dois tipos
  de título da página de extensões.
- `webview.css` ajusta a família base das páginas internas e seus h1/h2/h3.
  Fontes monoespaçadas continuam independentes. Uma extensão que define sua
  própria família sem usar a variável nativa pode conservar essa fonte.
- O hash CSP do script que contém a folha do webview é recalculado; a política
  de segurança é preservada. O checksum do CSS alterado é atualizado em
  `product.json`, mantendo a verificação dos demais recursos.
- Antes de escrever, o instalador confere a versão, o conjunto exato de três
  arquivos, os hashes do pacote e os bytes existentes. Escritas usam troca
  atômica por arquivo; uma falha observada restaura os arquivos já trocados.
  `apply` e `restore` também aceitam um estado parcial composto pelos hashes
  originais/alterados do mesmo pacote, para recuperação após interrupção.
- Uma atualização do VS Code pode substituir estes recursos. O instalador
  recusa versões diferentes da validada, e não sobrescreve mudanças desconhecidas.
  Revalide a nova versão antes de reaplicar; não restaure arquivos de uma versão
  antiga sobre uma instalação nova.

## Conferência desta implementação

A cópia completa do VS Code 1.137.0 em `.vscode-test/plex-production-code/`
iniciou com os arquivos preparados. A conferência do renderer verificou Plex
Bold/SemiBold nos títulos, a família e os pesos no README e JetBrains Mono
no código e terminal. Duas leituras, separadas por recarga da janela, passaram
sem injeção temporária de CSS pelo DevTools. Aplicação repetida não mudou
arquivos; restauração recuperou os bytes originais. Evidência local em
`.vscode-test/plex-production/persistence-result.json` e nas capturas dessa pasta.

Em 12 de setembro de 2026, os mesmos três arquivos foram aplicados à instalação
produtiva em `/usr/share/code/resources/app`, após autenticação gráfica. A
leitura posterior confirmou os hashes preparados. O backup durável fica em
`~/.local/share/vyrion-two-dark/ui-backups/vscode-1.137.0/`. A recarga da janela
produtiva foi solicitada pela API pública do VS Code com um auxiliar temporário;
o evento posterior à recarga confirmou outro processo de extensões, VS Code
1.137.0 e o appRoot produtivo. Evidência em
`.vscode-test/plex-production/production-reload.json`.
