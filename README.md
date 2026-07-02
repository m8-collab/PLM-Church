# Pamoja Life Ministry — Church Website

A full-stack church website: Next.js (React) + Node API routes, a SQLite
database via Prisma, member login (NextAuth), and online giving (Stripe
Checkout, test mode by default). Styled to match the Pamoja Life Ministry
brand (green/gold, Playfair Display + Lato).

**Pages:** Home, About, Sermons, Events, Ministries, Blog, Donate, Contact,
Login/Register, Member Dashboard.

This was written in a sandbox without internet access, so it has **not been
run yet**. Follow the steps below on your own machine — they're the same
steps any Next.js app needs, nothing church-specific to figure out.

## 1. Prerequisites

- [Node.js](https://nodejs.org) 18 or newer (check with `node -v`)
- That's it — the database is a local SQLite file, no separate DB server needed.

## 2. Install and set up

```bash
cd pamoja-life-ministry
npm install
cp .env.example .env
```

Open `.env` and:
- Generate a real `NEXTAUTH_SECRET`: run `openssl rand -base64 32` and paste the result in.
- Leave `DATABASE_URL` as-is — it points to a local SQLite file.
- Leave the Stripe keys as placeholders for now (donations will show a clear
  setup message until you add real ones — see step 5).

Then create the database and load sample content:

```bash
npx prisma generate
npm run db:push
npm run db:seed
```

This creates `prisma/dev.db` with a sample member login
(`grace@example.org` / `password123`), four sample events, and three sample
sermons matching the church's Firm Foundation and Pamoja series.

## 3. Run it locally

```bash
npm run dev
```

Open **http://localhost:3000** in your browser. That's the whole site,
running on your own machine.

## 4. Try the member login

- Go to `/login` and sign in with `grace@example.org` / `password123`, or
- Go to `/register` to create a new account.

`/dashboard` is protected — visiting it while logged out redirects to `/login`.

## 5. Turn on real donations (optional)

The Donate page works end-to-end against Stripe's **test mode**, which uses
fake cards and never touches real money:

1. Create a free account at https://dashboard.stripe.com
2. Copy your **test mode** Secret key and Publishable key from
   https://dashboard.stripe.com/test/apikeys
3. Paste them into `.env` as `STRIPE_SECRET_KEY` and
   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Restart `npm run dev`
5. Use Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC

To accept real donations, switch to your Stripe **live mode** keys once
you've verified your Stripe account — no code changes needed.

## 6. Editing content

Events and sermons live in the database, seeded by `prisma/seed.ts`. The
fastest way to add or edit them locally is:

```bash
npx prisma studio
```

This opens a visual database editor at http://localhost:5555 where you can
add events, sermons, and view contact messages and donations — no SQL needed.

There's also an API for both (`POST /api/events`, `POST /api/sermons`) if
you'd rather build an admin form later. Note: those routes are currently open
for ease of local development — before putting this on the public internet,
add an admin check to them (see the comment in each route file).

The **Ministries** and **Blog** pages are currently static content (matching
the original design) rather than database-driven — say the word if you'd
like those wired to the database too, the same way sermons and events are.

## 7. Putting this on the internet later

This README covers running it on your own computer. When you're ready to put
it on the open internet, you'll want:

- A real Postgres database instead of SQLite (swap the `provider` in
  `prisma/schema.prisma` and update `DATABASE_URL`)
- A host like Vercel, Railway, or Render
- Stripe **live mode** keys
- A real email provider (e.g. Resend) wired into the contact form so messages
  reach an inbox, not just the database

Happy to help with any of those when you get there.

## Project structure

```
src/app/             Pages and API routes (Next.js App Router)
src/components/      Shared UI: Navbar, Footer, CrossMark logo, auth widgets
src/lib/             Database client and auth configuration
prisma/schema.prisma Database tables: Member, Event, Sermon, Donation, ContactMessage
prisma/seed.ts        Sample data loaded by `npm run db:seed`
```
