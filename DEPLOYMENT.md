# Deployment Guide (Vercel + Supabase)

## 1. Set up Supabase

1. Create a project at https://supabase.com.
2. **Database:** Project Settings → Database → Connection string → copy the
   "URI" under **Transaction pooler** (this one works with Vercel's serverless
   functions). This is your `DATABASE_URL`.
3. **Storage:** In the Supabase dashboard, go to Storage and create two
   buckets, both set to **Public**:
   - `gallery-photos`
   - `sermon-videos`
4. **API keys:** Project Settings → API → copy the **Project URL** and the
   **service_role** key (not the anon key — the service role key is needed
   server-side to upload files).

## 2. Push the schema to Supabase

Locally, with `DATABASE_URL` set in `.env` to your Supabase connection string:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

## 3. Deploy to Vercel

1. Push the project to GitHub.
2. Open Vercel and import the repository.
3. In Vercel Project Settings → Environment Variables, add:
   - `DATABASE_URL` — Supabase connection string
   - `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
   - `NEXTAUTH_URL` — your production URL (e.g. `https://yoursite.vercel.app`)
   - `NEXTAUTH_SECRET`
   - `ADMIN_EMAIL`
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM` (if using the contact form email)
4. Deploy the project.

## 4. Create the first admin

1. Register a normal member account on the live site.
2. In Supabase → Table Editor → `Member`, find that row and change `role` to
   `admin` (this must also match the `ADMIN_EMAIL` env var for the admin
   dashboard features to unlock).
3. Sign in and open `/dashboard`.

## 5. Uploading photos and videos

- `/dashboard/gallery` — pick a photo file; it uploads to the `gallery-photos`
  Supabase Storage bucket and the public URL is saved to the database.
- `/dashboard/sermons` — either pick a video file (uploads to the
  `sermon-videos` bucket) or paste a link (e.g. a YouTube URL) — useful for
  full-length services, since it won't use your Supabase storage space.

No file is ever stored inside the database itself — only the public URL
Supabase returns after the upload.
