# Persysta Marketing Site

Marketing landing pra `persysta.com.br` — vitrine dos produtos da família Persysta.

## Produtos apresentados

- `/stores` — Persysta Stores (e-commerce SaaS, repo `persysta-stores`)
- `/email` — Persysta Email (email marketing standalone)
- `/help` — Persysta Help (helpdesk standalone)
- `/financas` — Persysta Finanças (link pra app.persysta.com.br, repo `persysta`)

> Email e Help são **vendidos a partir do mesmo backend do Stores** (mesma infra
> técnica, planos diferentes que ativam módulos diferentes). Apenas Finanças
> roda em codebase separado.

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 3.4
- TypeScript

## Dev

```bash
npm install
npm run dev   # http://localhost:3000
```

API backend em dev: assume `http://localhost:8001` (Persysta Stores rodando
em `C:/dev/persysta-stores`). Override via `BACKEND_INTERNAL_URL` env.

## Deploy

- Hosting: Railway (mesmo projeto que persysta-stores, service separado)
- Domain: `persysta.com.br` (apex) — Cloudflare DNS
- Build: `npm run build` (Next standalone output)

## Repositório

Parte da família Persysta. Vide `PERSYSTA_FAMILY.md` no monorepo virtual:
- `C:/dev/persysta` (Persysta Finanças)
- `C:/dev/persysta-stores` (Persysta Stores backend + admin frontends)
- `C:/dev/persysta-site` (este repo)
