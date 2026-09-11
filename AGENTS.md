# Vyrion Two Dark

Este repositório é o fork de desenvolvimento. A pasta irmã `origem/` é um
checkout de referência; consulte-a e atualize sua revisão somente pelo fluxo
de adoção documentado em `docs/development.md`.

- Leia `package.json`, `UPSTREAM.md` e `docs/development.md` antes de editar.
- Para regras de tokens, consulte `docs/theme-design.md`; o conjunto prioritário
  é Python, Rust, TypeScript, Go, C, C++ e Dart/Flutter. Os estilos documentados
  como exemplos continuam propostas até serem escolhidos.
- Mantenha cores próprias em `themes/VyrionTwoDark-color-theme.json`; as caixas
  usam a API pública de decorações em `src/`. Mapeie palavras e escopos por papel
  em `src/function-keywords.ts`, sem buscar palavras em texto bruto.
- `themes/OneDark.json` acompanha a base upstream; preserve-o entre atualizações.
- A extensão deve funcionar e ser empacotada sem acessar a pasta irmã.
- Conserve histórico, licença e créditos; preserve a identidade própria no manifesto.
- Use commits pequenos e branches de ajuste/atualização. Nunca faça push para upstream.
- Nas iterações locais, avance apenas `dev.N` com `npm run version:iteration`.
  A série atual é `0.2.2-dev.N`; reserve versões estáveis para marcos consolidados.
  Siga a ordem e os limites de distribuição em `docs/development.md`.
- Para cores, valide JSON, empacote com `npm run package` e confira visualmente
  as linguagens/componentes afetados em F5. Não crie testes que só reproduzam cores.
- Para a lógica das caixas, execute os casos com gramáticas reais de
  `tests/smoke.ts` e confira troca de tema, desativação e edição de strings.
- Não publique no Marketplace como parte de um ajuste local de tema.
