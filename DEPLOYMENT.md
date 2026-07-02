# Deployment Guide

## 1. Deploy to Vercel

1. Push the project to GitHub.
2. Open Vercel and import the repository.
3. In Vercel Project Settings → Environment Variables, add:
   - DATABASE_URL
   - NEXTAUTH_URL
   - NEXTAUTH_SECRET
   - ADMIN_EMAIL
   - EMAIL_HOST
   - EMAIL_PORT
   - EMAIL_USER
   - EMAIL_PASS
   - EMAIL_FROM
   - STRIPE_SECRET_KEY
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
4. Deploy the project.

## 2. Production database

The app currently uses Prisma with SQLite for local development. For Vercel production, use a hosted PostgreSQL database such as:
- Neon
- Supabase
- PlanetScale

Set DATABASE_URL to the production database URL.

## 3. Run Prisma on the production database

After deployment, run:

```bash
npx prisma db push
```

## 4. Create the first admin

1. Register a normal member account.
2. Update that member's role to admin in the database.
3. Sign in and open /dashboard.
