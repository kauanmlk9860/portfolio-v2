# Portfólio v2 — Kauan Rodrigues

Portfólio em duas partes: uma **fachada ilustrada** que serve de porta de entrada, e um site em **papel e tinta** atrás dela.

🔗 **[kauanmlk9860.github.io/portfolio-v2](https://kauanmlk9860.github.io/portfolio-v2/)**

A primeira versão continua no ar em [kauanmlk9860.github.io/portfolio](https://kauanmlk9860.github.io/portfolio/) ([repositório](https://github.com/kauanmlk9860/portfolio)).

## Como funciona

O portfólio é navegado como um lugar, não como uma página: **fachada → corredor → sala**.

1. **Fachada** — a rua, com a porta principal. Parede de tijolos, adesivos das tecnologias, placa pendurada, árvore, janela, floreira e caminho de pedras.
2. **Corredor** — uma porta por assunto, cada uma com placa e adesivo próprio. A faixa rola na horizontal.
3. **Sala** — o conteúdo daquele assunto, pregado na parede.

Tudo é **SVG desenhado no código**. Não há imagem, modelo 3D nem biblioteca de animação; são `path` calculados.

Abrir qualquer porta recolhe a folha na dobradiça e aproxima o vão antes de trocar de cena.

### Três decisões que valem saber antes de mexer

- **O traço à mão vem de um filtro**, não do desenho. `feTurbulence` + `feDisplacementMap` entortam as linhas vetoriais em [`Facade.tsx`](src/components/facade/Facade.tsx). O filtro fica só no cenário: aplicado nos adesivos e nos textos, borraria as letras.
- **O desalinhamento é determinístico.** [`wobble.ts`](src/components/facade/wobble.ts) deriva o desvio de uma semente, não de `Math.random` — com aleatoriedade real, servidor e cliente desenhariam paredes diferentes e o React acusaria divergência de hidratação.
- **O conteúdo de todas as salas também vai num bloco de reserva.** Ele fica fora da tela, não em `display: none` — assim os buscadores leem o texto, que de outro modo estaria atrás de um clique que nenhum rastreador dá. O `<noscript>` do layout traz esse bloco de volta e esconde a fachada, para quem não executa JavaScript não ficar preso na porta.
- **O corredor rola com `overflow` nativo**, e não com arraste próprio: assim já funciona com trackpad, toque, barra de rolagem e teclado, sem reimplementar nenhum deles.

## Stack

- [Next.js](https://nextjs.org) (App Router, exportação estática)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)

Sem biblioteca de animação e sem 3D — a versão anterior usava Three.js, removido nesta.

## Estrutura

```
src/
  app/                  # layout, página e o sistema de papel e tinta
  components/
    facade/             # fachada, corredor e as portas
    site/               # a sala e o conteúdo em papel
    Shell.tsx           # a navegação: fachada -> corredor -> sala
  data/                 # conteúdo (profile.ts, projects.ts)
```

Para atualizar bio, experiência, habilidades e contatos, edite [`src/data/profile.ts`](src/data/profile.ts). Para os projetos, [`src/data/projects.ts`](src/data/projects.ts). Certificados, canais e o FAQ ficam em [`src/data/extras.ts`](src/data/extras.ts).

As portas do corredor — quais existem, em que ordem, com que rótulo e cor — são declaradas no topo de [`src/app/page.tsx`](src/app/page.tsx). Os adesivos da porta da rua ficam em [`Door.tsx`](src/components/facade/Door.tsx).

## Rodando localmente

```bash
npm install
npm run dev
```

O site sobe em `http://localhost:3000/portfolio-v2`.

## Deploy

Cada push na branch `master` dispara o workflow em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que roda `npm run build` e publica no GitHub Pages.
