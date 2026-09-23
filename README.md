# flua-website
Repositório oficial do website institucional do laboratório FLUA. Desenvolvido com foco em performance, acessibilidade e identidade visual.

## Rodando o projeto

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev        # site em http://localhost:3000
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint (o `next build` não roda lint) |
| `npm run typecheck` | Verificação de tipos do TypeScript |
| `npm run remotion` | Abre o Remotion Studio para editar as animações |

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**, com os tokens da identidade visual em `src/app/globals.css`
- **Motion** para microinterações e animações ligadas ao scroll
- **Remotion** (`@remotion/player`) para as animações de abertura e da seção "A fala que flui"

## Onde está cada coisa

- `src/content/`: todo o texto do site. Conteúdo provisório aparece marcado como pendente.
- `src/components/brand/`: logo, arcos do módulo base, pattern e ondas, extraídos do Manual de Identidade Visual.
- `src/components/sections/`: seções das páginas.
- `src/remotion/`: composições do Remotion. Cada uma tem um `.frame.tsx` (desenho puro de cada frame, usado também como imagem estática) e um `.meta.ts` (tamanho e duração).
