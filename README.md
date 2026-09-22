# Portfólio v2 — Kauan Rodrigues

Portfólio em duas partes: uma **fachada ilustrada** que serve de porta de entrada, e um site em **papel e tinta** atrás dela.

🔗 **[kauanmlk9860.github.io/portfolio-v2](https://kauanmlk9860.github.io/portfolio-v2/)**

A primeira versão continua no ar em [kauanmlk9860.github.io/portfolio](https://kauanmlk9860.github.io/portfolio/) ([repositório](https://github.com/kauanmlk9860/portfolio)).

## Como funciona

O portfólio é navegado como um lugar, não como uma página: **fachada → corredor → sala**.

1. **Fachada** — a rua, com a porta principal. Parede de tijolos, adesivos das tecnologias, placa pendurada, árvore, janela, floreira e caminho de pedras.
2. **Corredor** — em primeira pessoa: rolar o mouse anda para a frente, com uma porta por assunto nas paredes dos dois lados. A perspectiva é CSS 3D, não WebGL — piso, teto e paredes montados com `preserve-3d`, e a câmera avança deslocando a cena em Z. Como fica tudo em DOM, as portas continuam sendo botões acessíveis por teclado. A folha de cada porta gira na dobradiça em `rotateY`, e o corredor é povoado por quadros, luminárias, plantas e a passadeira — tudo em [`CorridorProps.tsx`](src/components/facade/CorridorProps.tsx), posicionado pelos ajudantes de [`corridor.ts`](src/components/facade/corridor.ts).
3. **Sala** — cada assunto tem o seu ambiente desenhado, com adereços próprios e a parede tingida pela cor daquela porta. O conteúdo rola por cima do cenário, que fica fixo ao fundo.

Os ambientes são montados em torno do que o Kauan gosta — basquete, música, amor e programação: a cesta e a bola na sala de Projetos, a guitarra e os potes de `{ }` e `</>` em Habilidades, os discos e a caixa de som em Conteúdo, a carta lacrada com coração em Contato. Trocar os adereços de uma sala é mexer num componente só, em [`props.tsx`](src/components/rooms/props.tsx).

Tudo é **SVG desenhado no código**. Não há imagem, modelo 3D nem biblioteca de animação; são `path` calculados.

Abrir qualquer porta recolhe a folha na dobradiça e aproxima o vão antes de trocar de cena.

### Três decisões que valem saber antes de mexer

- **O traço à mão vem de um filtro**, não do desenho. `feTurbulence` + `feDisplacementMap` entortam as linhas vetoriais em [`Facade.tsx`](src/components/facade/Facade.tsx). O filtro fica só no cenário: aplicado nos adesivos e nos textos, borraria as letras.
- **O desalinhamento é determinístico.** [`wobble.ts`](src/components/facade/wobble.ts) deriva o desvio de uma semente, não de `Math.random` — com aleatoriedade real, servidor e cliente desenhariam paredes diferentes e o React acusaria divergência de hidratação.
- **O conteúdo de todas as salas também vai num bloco de reserva.** Ele fica fora da tela, não em `display: none` — assim os buscadores leem o texto, que de outro modo estaria atrás de um clique que nenhum rastreador dá. O `<noscript>` do layout traz esse bloco de volta e esconde a fachada, para quem não executa JavaScript não ficar preso na porta.
- **No corredor 3D, a cena inteira é transparente ao ponteiro.** O `div` que a envolve cobre a viewport no plano da câmera, à frente de tudo; sem `pointer-events: none` nele, ele engole todo clique e nenhuma porta abre. Só os botões das portas voltam a receber ponteiro.
- **`elementFromPoint` mente em cena 3D.** Ele apontava a porta enquanto o clique real caía na parede. O que vale é rastrear `pointerdown`/`click` de verdade.
- **O espelhamento da parede direita se resolve olhando, não deduzindo.** A paridade muda conforme a hierarquia de transforms; a cada mexida na estrutura da porta, vale conferir se o texto ainda lê certo antes de aplicar qualquer `scaleX(-1)`.

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
