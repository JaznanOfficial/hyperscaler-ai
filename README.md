# Hyperscaler

Hyperscaler is a multi-tenant Next.js 16 platform that powers the public marketing site, subscriptions, and role-aware dashboards (client, employee, admin, super-admin). It relies on Stripe for billing, React Query/Zod-driven client experiences, and Prisma/PostgreSQL for persistence. This README summarizes everything you need to bring the project online locally or in production.

## Features at a Glance

1. **Marketing site (`src/app/(site)`)** – Hero sections, testimonials, pricing, and CTA blocks composed from shadcn UI primitives.
2. **Dashboards (`src/app/(dashboards)`)** – Client, employee, admin, and super-admin workspaces reuse sidebar layouts, charts, and AI-powered panels.
3. **Auth & Sessioning** – Credentials-based NextAuth setup with hashed passwords, role propagation, and shared backend utilities.
4. **Billing** – Stripe Checkout for plan changes, subscription lifecycle sync, and webhook handling.
5. **Messaging** – Resend-backed transactional emails for password reset and verification flows.

## Tech Stack

- **Runtime**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui, class-variance-authority, tw-animate
- **State/Data**: @tanstack/react-query, Zod, Zustand, Sonner notifications
- **Backend**: Prisma ORM, PostgreSQL (works great with Neon or Dockerized Postgres)
- **Payments & Email**: Stripe, Resend
- **Tooling**: Bun, Biome, Ultracite, Prisma Migrate/Studio

## Prerequisites

- **Node.js** ≥ 20.10 (LTS recommended)
- **[Bun](https://bun.sh/)** ≥ 1.1 (all scripts assume Bun; don’t use npm/yarn)
- **PostgreSQL** database URL (Neon, Supabase, local Docker, etc.)
- **Stripe** account with test keys + CLI for local webhooks
- **Resend** API key & verified sender domain/address

## 1. Install Dependencies

```bash
bun install
```

## 2. Configure Environment

Create a `.env.local` file (Next.js loads it automatically). Use the table below as a reference:

| Variable | Required | Description |
| --- | :---: | --- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string used by Prisma. Neon is a good choice for hosted dev envs. |
| `AUTH_SECRET` | ✅ | NextAuth secret; generate via `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | ✅ | Public URL that NextAuth uses to craft callbacks (e.g., `http://localhost:3000`). |
| `NEXT_PUBLIC_APP_URL` | ✅ | Base URL exposed to the browser for Stripe redirects. Usually same as `NEXTAUTH_URL`. |
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key (e.g., `sk_test_...`). Required by `src/lib/stripe.ts`. |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Secret returned by `stripe listen --forward-to ...` for webhook verification. |
| `RESEND_API_KEY` | ✅ | Resend API key used by transactional email utilities. |
| `SENDER_EMAIL` | ⛔️* | Optional override for the default `noreply@hyperscaler.scalebuild.ai` sender. |

> ℹ️ Environment variables referenced in code live in `src/backend/config`, `src/lib`, and API routes—double-check those files whenever adding new secrets.

## 3. Database & Prisma

Run migrations locally:

```bash
bunx prisma migrate dev
```

Need a clean schema without generating a new migration? Use `bunx prisma db push`.

To explore/edit data visually:

```bash
bunx prisma studio
```

### Seeding Subscription Packages

Create at least one `CLIENT` user first, then seed sample Stripe packages:

```bash
bun run seed:packages
```

The script (`prisma/seed-packages.ts`) associates demo subscriptions with the first client user it finds.

## 4. Start the Dev Server

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000). The app router supports hot reloading for both marketing pages and dashboards.

## 5. Stripe Webhooks (Local)

Forward Stripe events so the webhook route (`src/app/api/stripe/webhook/route.ts`) can verify signatures:

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

Copy the CLI output `whsec_...` value into `STRIPE_WEBHOOK_SECRET`.

## 6. Quality Checks & Tooling

| Command | Purpose |
| --- | --- |
| `bun run lint` | Biome linting (format + static checks). |
| `bun run format` | Format files in-place via Biome. |
| `bun run check` | Ultracite project checks (patterns, forbidden APIs, etc.). |
| `bun run fix` | Ultracite autofix for common issues. |
| `bunx prisma generate` | Regenerate Prisma client (automatically run during `bun install`). |

Use `bunx tsc --noEmit` if you need an explicit type-check step (TypeScript is already enforced via Next.js builds).

## 7. Production Build & Start

```bash
bun run build   # runs prisma generate + next build
bun run start   # serves .next output
```

Ensure all environment variables are available in your hosting provider (Vercel, Render, Fly.io, etc.). Set `NEXTAUTH_URL`/`NEXT_PUBLIC_APP_URL` to the public HTTPS domain in production.

## Project Structure

```
├── prisma/
│   ├── schema.prisma         # PostgreSQL models & enums
│   └── migrations/           # Versioned migrations
├── src/
│   ├── app/
│   │   ├── (site)/           # Public marketing pages
│   │   ├── (dashboards)/     # Role-specific dashboards & routes
│   │   └── api/              # Route handlers (Stripe, auth helpers, etc.)
│   ├── backend/              # Auth, Prisma, config, repositories
│   ├── components/           # Reusable UI (shadcn-based) grouped by domain
│   ├── data/                 # Static data blobs consumed by UI
│   └── lib/                  # Stripe helpers, email utilities, shared logic
├── public/                   # Marketing imagery & assets
├── .windsurf/                # Repo-specific automation rules & workflows
└── README.md
```

## Common Workflows

1. **Add UI primitives** – Use the shadcn CLI so new components stay consistent:
   ```bash
   bunx shadcn@latest add button card dialog
   ```
2. **Share validation schemas** – Declare Zod schemas near their feature (e.g., inside `src/backend/schemas`) and infer types via `z.infer` for React Query hooks.
3. **Backend utilities** – Keep Prisma logic inside `src/backend` repositories/services to avoid duplicating queries in React components.
4. **Stripe price changes** – Update `src/app/api/stripe/checkout-package/route.ts` metadata or migrations, then redeploy.

## Deployment Notes

- Configure production Postgres + `DATABASE_URL` (Neon/PlanetScale via Prisma Data Proxy is supported).
- Supply the same Stripe + Resend secrets you used locally, but switch to live keys/domains when ready.
- Consider enabling `bun run lint`, `bun run check`, and `bun run build` inside CI to catch regressions before shipping.

---

Need more guidance? Start with `src/components/shared` to see how layout primitives are composed, or ping the team in the Scalebuild Slack channel for architectural decisions.
