# Tipografia migrada para VyrionStudio

A implementação de tipografia passou a pertencer ao projeto irmão
`code/vyrionStudio`, inicialmente na versão `0.1.0-dev.1`.
O tema Vyrion Two Dark continua responsável pelas cores e pelos tokens.

Use **VyrionStudio: Abrir central** para configurar, aplicar, restaurar e
verificar a tipografia. Aplicar/restaurar exigem confirmação.

O backup anterior em
`~/.local/share/vyrion-two-dark/ui-backups/vscode-1.137.0/` foi preservado e é
reconhecido pela VyrionStudio. Os originais são importados quando necessário;
não é preciso restaurar a instalação apenas para migrar o gerenciamento.

O mecanismo agora vive em `vyrionStudio/backend/typography.py`, com CLI Typer em
`backend/cli.py`. Consulte o README daquele projeto para recuperação manual.
A implementação anterior permanece no histórico Git, a partir do commit
`8e2b9b2`; não mantenha duas cópias editáveis do instalador.

Esta migração de código não modifica os arquivos nativos já aplicados nem
exige uma nova versão do VSIX do tema. Para mudanças futuras na interface,
a necessidade é de reinício completo do aplicativo, não apenas da janela.
