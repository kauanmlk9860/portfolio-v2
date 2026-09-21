# Portfólio v2 — Kauan Rodrigues

Segunda versão do meu site pessoal, com a linguagem visual das páginas de produto da Apple: tipografia centralizada, muito respiro entre as seções e um objeto 3D interativo como protagonista do topo.

🔗 **[kauanmlk9860.github.io/portfolio-v2](https://kauanmlk9860.github.io/portfolio-v2/)**

A versão anterior continua no ar em [kauanmlk9860.github.io/portfolio](https://kauanmlk9860.github.io/portfolio/) ([repositório](https://github.com/kauanmlk9860/portfolio)).

## Stack

- [Next.js](https://nextjs.org) (App Router, exportação estática)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Three.js](https://threejs.org) via [React Three Fiber](https://r3f.docs.pmnd.rs) e [drei](https://drei.docs.pmnd.rs)

## O elemento 3D

O chip do topo é geometria procedural — não há modelo `.glb` para baixar. Ele gira sozinho, adianta a rotação conforme o scroll e inclina de leve seguindo o ponteiro.

Três decisões que valem saber antes de mexer:

- **A cena entra por `next/dynamic` com `ssr: false`**, porque WebGL não existe na renderização do servidor. Essa opção só funciona dentro de um Client Component — por isso existe o intermediário [`HeroVisual.tsx`](src/components/HeroVisual.tsx).
- **A iluminação usa `Lightformer` em vez de um preset de `Environment`.** Os presets baixam um HDR de CDN, o que criaria dependência de rede num site estático.
- **O `frameloop` pausa quando o canvas sai da tela**, e a animação para inteira sob `prefers-reduced-motion`.

O three.js fica num chunk separado (~257 KB gzip) carregado depois da hidratação; a carga inicial da página é de ~175 KB gzip.

## Estrutura

```
src/
  app/                  # layout, página principal e estilos globais
  components/
    three/              # cena 3D (Canvas, chip, iluminação)
    ...                 # seções e UI (Hero, About, Projects, Skills, Contact...)
  data/                 # conteúdo do site (profile.ts, projects.ts)
```

Para atualizar bio, experiência, habilidades e contatos, edite [`src/data/profile.ts`](src/data/profile.ts). Para os projetos, [`src/data/projects.ts`](src/data/projects.ts).

## Rodando localmente

```bash
npm install
npm run dev
```

O site sobe em `http://localhost:3000/portfolio-v2`.

## Deploy

Cada push na branch `master` dispara o workflow em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que roda `npm run build` e publica o resultado no GitHub Pages.
