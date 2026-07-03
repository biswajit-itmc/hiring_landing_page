# OyeNaukri — Build Roadmap

Live phased plan for turning the frontend into a full AI-powered hiring platform.
See `PLAN.md` for the complete product flow.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind v4, Material Design 3 tokens, Material Symbols, shadcn/ui
- **Backend:** Node.js + Express + TypeScript (in `backend/`)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Firebase (client SDK + Admin SDK token verification)
- **AI:** OpenRouter free-tier models (chosen per feature)
- **File storage:** TBD in Phase 2 (resumes/logos)

## Phased Plan

| Phase | Scope | Status |
|-------|-------|--------|
| 1 — Foundation + Auth | `backend/` scaffold, Prisma/Postgres schema seed, Firebase Admin verify, frontend Firebase client + AuthProvider, login/signup (email+pw + Google), role selection, Next.js protected-route middleware, role-aware `/dashboard` redirect | ✅ Done |
| 2 — Onboarding | Seeker 7-step onboarding (resume upload + AI parse, profile completion %), employer registration + company onboarding, company verification stub | ✅ Done |
| 3 — Profiles + Job Discovery | Seeker profile (all sections), employer company page/profile, public job search + filters, job details, saved jobs, public company page | ✅ Done |
| 4 — Employer Jobs Lifecycle | Post-job 8-step wizard w/ AI JD gen + salary rec, manage jobs (status tabs/duplicate/pause/close/delete), applicant pipeline (kanban + stage moves + AI match score + ratings + notes), AI candidate ranking | ✅ Done |
| 5 — Applications + Comms | Apply flow (multi-step modal: resume→cover letter→screening questions→review), my applications page (status timeline + filters), recruiter↔candidate chat (conversation list + message thread), in-app notifications (bell dropdown + unread badge + auto-refresh), application timeline tracking, interview scheduling notifications | ✅ Done |
| 6 — AI Deep Dive | Resume analyzer/ATS/builder/rewrite, cover letter gen, AI career coach, interview prep/mock, salary prediction, skill gap, employer AI screening + question gen | Pending |
| 7 — Billing, Team, Analytics, Admin | Wallet/subscriptions/invoices, team mgmt, analytics dashboards, settings, admin panel | Pending |

## Backend Layout (Phase 1)

```
backend/
  src/
    config/        firebase, env, cors
    db/            prisma client singleton
    middleware/    auth (verify Firebase ID token), error handler, role guard
    routes/        v1 api routers (auth, users, health)
    controllers/
    services/
    utils/
    types/
  prisma/
    schema.prisma
    seed.ts
  .env.example
  package.json
  tsconfig.json
  README.md
```

## Frontend Additions (Phase 1)

- `lib/firebase.ts` — client SDK init
- `lib/api.ts` — typed fetch wrapper to backend
- `contexts/auth-context.tsx` — AuthProvider (current user, role, idToken)
- `middleware.ts` — protect `/dashboard/*` (redirect to `/login` when no session)
- `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx`, `app/(auth)/role/page.tsx`
- `/dashboard` reads role from backend profile and redirects to `/dashboard/seeker` or `/dashboard/employer`
