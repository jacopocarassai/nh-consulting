# NH Consulting

A marketing website built for a colleague, [Nathalie Håkansson](https://nhconsulting.se), founder of NH Consulting — a B2B commercial growth consultancy.

**Live site:** [nhconsulting.se](https://nhconsulting.se)

## Features

- Marketing homepage with case studies, testimonials and a Calendly booking widget
- Case study detail pages
- A lightweight admin panel for managing case studies (backed by Supabase, with authentication)
- Cookie consent banner gating analytics/functional scripts (Google Analytics, Calendly)

## Tech stack

- [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) / [TanStack Router](https://tanstack.com/router) — SSR framework and file-based routing
- [TanStack Query](https://tanstack.com/query) — data fetching and caching
- [Vite](https://vitejs.dev/) — build tooling
- [Tailwind CSS v4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) — styling and accessible UI primitives
- [Supabase](https://supabase.com/) — Postgres database, authentication and storage
- [TypeScript](https://www.typescriptlang.org/)
- Deployed on [Vercel](https://vercel.com/)

## Getting started

```bash
npm install
npm run dev
```

Requires a Supabase project with the schema in `supabase/migrations` applied, and the corresponding environment variables (Supabase URL and publishable key) set locally.
