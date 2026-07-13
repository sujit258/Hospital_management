# Ayurvedic Hospital Web + Admin

Next.js (App Router) project with patient-facing site plus admin CRM for patients, appointments, prescriptions, invoices, and CMS-ready content.

## Stack
- Next.js 14 (TypeScript, App Router, src directory)
- Tailwind CSS + custom tokens
- Prisma ORM (PostgreSQL)
- NextAuth (email/password/adapter-ready)
- React Query for client data fetching
- PDF/email ready via Nodemailer placeholder

## Getting started
1) Install dependencies:
```
npm install
```
2) Copy env template and set secrets:
```
cp .env.example .env.local
```
3) Start Postgres and run migrations:
```
npx prisma migrate dev --name init
npx prisma db seed
```
4) Run the app:
```
npm run dev
```
Visit http://localhost:3000.

## Scripts
- `npm run dev` – start dev server
- `npm run build` / `npm start` – production build/serve
- `npm run lint` – lint
- `npm run prisma:studio` – open Prisma Studio
- `npm run seed` – seed sample admin/doctor/patient

## Features in this scaffold
- Public pages: home, services, doctors, blog, booking CTA
- Admin dashboard: overview, patients, appointments, prescriptions, invoices
- API routes: `/api/patients`, `/api/appointments`, `/api/invoices`
- Prisma schema for users, patients, practitioners, appointments, encounters, prescriptions, invoices, payments, CMS content, audit logs

## Next steps
- Wire authentication and RBAC guards for dashboard routes
- Connect booking form to `/api/appointments`
- Add PDF generation for prescriptions/invoices
- Add notifications (email/SMS) for confirmations and reminders
- Harden security: rate limits, audit logging, field encryption for PII
