# Portfólio v2 — Kauan Rodrigues

Portfólio em duas partes: uma **fachada ilustrada** que serve de porta de entrada, e um site em **papel e tinta** atrás dela.

🔗 **[kauanmlk9860.github.io/portfolio-v2](https://kauanmlk9860.github.io/portfolio-v2/)**

A primeira versão continua no ar em [kauanmlk9860.github.io/portfolio](https://kauanmlk9860.github.io/portfolio/) ([repositório](https://github.com/kauanmlk9860/portfolio)).

## Como funciona

A fachada é **SVG desenhado no código** — parede de tijolos, porta com os adesivos das tecnologias, placa pendurada, árvore, janela, floreira e caminho de pedras. Não há imagem nem modelo 3D; tudo são `path` calculados.

Clicar na porta recolhe as folhas nas dobradiças, aproxima o vão e entrega o site.

### Três decisões que valem saber antes de mexer

- **O traço à mão vem de um filtro**, não do desenho. `feTurbulence` + `feDisplacementMap` entortam as linhas vetoriais em [`Facade.tsx`](src/components/facade/Facade.tsx). O filtro fica só no cenário: aplicado nos adesivos e nos textos, borraria as letras.
- **O desalinhamento é determinístico.** [`wobble.ts`](src/components/facade/wobble.ts) deriva o desvio de uma semente, não de `Math.random` — com aleatoriedade real, servidor e cliente desenhariam paredes diferentes e o React acusaria divergência de hidratação.
- **O site só entra no DOM depois da entrada.** Renderizado atrás da fachada, o `IntersectionObserver` já teria revelado tudo da primeira dobra e as animações chegariam gastas. Quem não executa JavaScript recebe o site direto: o `<noscript>` do layout esconde a fachada e libera o conteúdo.

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
    facade/             # a cena SVG (parede, porta, placa, cenário)
    site/               # seções do site em papel
    Shell.tsx           # decide entre fachada e site
  data/                 # conteúdo (profile.ts, projects.ts)
```

Para atualizar bio, experiência, habilidades e contatos, edite [`src/data/profile.ts`](src/data/profile.ts). Para os projetos, [`src/data/projects.ts`](src/data/projects.ts). Os adesivos da porta ficam no topo de [`Door.tsx`](src/components/facade/Door.tsx).

## Rodando localmente

```bash
npm install
npm run dev
```

O site sobe em `http://localhost:3000/portfolio-v2`.

## Deploy

Cada push na branch `master` dispara o workflow em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que roda `npm run build` e publica no GitHub Pages.
