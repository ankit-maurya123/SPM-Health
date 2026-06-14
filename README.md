# SPMHealth — Healthcare website + admin panel

A modern, fully-responsive doctor/health website built with **Next.js 16** (App Router, Turbopack), **TypeScript**, **Tailwind v4** (glassmorphism), **MongoDB / Mongoose**, and a JWT-based admin panel.

## Quick start

### 1. Install MongoDB

- **Local** — install MongoDB Community Server and start `mongod`. The default `mongodb://127.0.0.1:27017/spmhealth` works out of the box.
- **Atlas** — create a free cluster and put the connection string in `.env.local`.

### 2. Environment

`.env.local` is already created:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/spmhealth
JWT_SECRET=change_me_in_production
ADMIN_EMAIL=admin@spmhealth.com
ADMIN_PASSWORD=Admin@12345
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Database name: **`spmhealth`**.

### 3. Run

```bash
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Pages

| Public                                        | Admin (JWT-protected)            |
| --------------------------------------------- | -------------------------------- |
| `/`             Home                          | `/admin`                Dashboard|
| `/about`        About                         | `/admin/appointments`   Manage   |
| `/services`     Services                      | `/admin/doctors`        CRUD     |
| `/doctors`      Doctors                       | `/admin/services`       CRUD     |
| `/appointment`  Booking                       | `/admin/blog`           CRUD     |
| `/blog`, `/blog/[slug]`                       | `/admin/contacts`       Inbox    |
| `/contact`      Contact                       | `/admin/login`          Sign in  |

## Admin login

`/admin/login` → `admin@spmhealth.com` / `Admin@12345` (seeded on first login).

## Architecture

- **Auth** — `proxy.ts` (Next.js 16 renamed middleware) guards `/admin/*` and `/api/admin/*` with a JWT cookie.
- **Models** — `models/` (Admin, Doctor, Service, Appointment, BlogPost, Contact).
- **Theme** — glassmorphism utilities and cyan→indigo brand gradient in `app/globals.css`.
- **SEO** — `app/sitemap.ts`, `app/robots.ts`, per-page metadata, JSON-LD schema in root layout.
