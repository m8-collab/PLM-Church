# Pamoja Life Ministry — Church Website

A full-stack church website: Next.js (React) + Node API routes, a Postgres
database via Prisma (hosted on Supabase), member login (NextAuth), photo/video
uploads via Supabase Storage, and a simple giving record (no payment
processor — donors give by bank transfer or mobile money and the gift is
logged). Styled to match the Pamoja Life Ministry brand (green/gold, Playfair
Display + Lato).

**Pages:** Home, About, Sermons, Events, Ministries, Blog, Donate, Contact,
Login/Register, Member Dashboard.

This was written in a sandbox without internet access, so it has **not been
run yet**. Follow the steps below on your own machine — they're the same
steps any Next.js app needs, nothing church-specific to figure out.

## 1. Prerequisites

- [Node.js](https://nodejs.org) 18 or newer (check with `node -v`)
- A free [Supabase](https://supabase.com) account (this project uses Supabase
  for both the database and file storage — no local database server needed).

## 2. Install and set up

```bash
cd pamoja-life-ministry
npm install
cp .env.local .env
```

Open `.env` and:
- Generate a real `NEXTAUTH_SECRET`: run `openssl rand -base64 32` and paste the result in.
- Create a free project at https://supabase.com, then fill in:
  - `DATABASE_URL` — Project Settings → Database → Connection string ("URI", transaction pooler)
  - `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` — Project Settings → API
- In the Supabase dashboard, go to **Storage** and create two **public**
  buckets: `gallery-photos` and `sermon-videos` (these hold the photos and
  videos an admin uploads).

Then create the database tables and load sample content:

```bash
npx prisma generate
npm run db:push
npm run db:seed
```

This connects to your Supabase database, creates the tables, and seeds a
sample member login (`grace@example.org` / `password123`), four sample
events, and three sample sermons matching the church's Firm Foundation and
Pamoja series.

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

## 5. How giving works

The Donate page doesn't process payments itself — it shows the church's bank
transfer / mobile money details, and once someone gives, they fill in a short
form so the gift gets recorded in the database (fund, amount, name, email).
Edit the placeholder bank/mobile money details in
`src/app/donate/page.tsx` with your real account details.

## 6. Uploading photos and sermon videos

Sign in as an admin (see step 7) and open `/dashboard`:

- **`/dashboard/gallery`** — pick a photo file from your computer. It's
  uploaded straight to the `gallery-photos` bucket in Supabase Storage, and
  the public URL Supabase returns is saved to the `GalleryItem` table.
- **`/dashboard/sermons`** — either pick a video file (uploaded to the
  `sermon-videos` bucket) or paste a link such as a YouTube URL — better for
  full, long services since it won't use your Supabase storage space. The
  chosen video's URL is saved to the `Sermon` table.

In both cases, the actual photo/video file lives in Supabase Storage, not in
the database — the database only stores a text link pointing to it.

## 7. Editing content

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

This README covers running it on your own computer, already pointed at your
Supabase database. When you're ready to put it on the open internet, see
`DEPLOYMENT.md` for the full Vercel + Supabase deployment steps. In short,
you'll want:

- Your Supabase project's connection string and API keys added as Vercel
  environment variables (already required for local dev too — see step 2)
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
``
