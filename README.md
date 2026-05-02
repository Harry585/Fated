# ANU Match MVP

A hackathon MVP for a no-swipe ANU dating app. Students verify an `@anu.edu.au` email, answer structured compatibility questions, and receive one scheduled match.

## Stack

- Next.js App Router
- TypeScript
- Supabase Auth/Postgres schema
- Vercel-ready deployment
- Resend-ready environment variable for email notifications

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## MVP Flow

1. Verify an ANU email address.
2. Fill in profile, attraction, relationship intent, and questionnaire answers.
3. Join the next matching round.
4. Run the demo matching round.
5. Review the generated match and opt in to connect.

The current UI includes a browser demo using seeded ANU users. The production path should wire Supabase Auth to the same profile and matching concepts.

## Matching Algorithm

Each user has:

- `selfAnswers`: what they are like.
- `preferenceAnswers`: what they want in a partner.

The matcher filters out ineligible users, enforces mutual gender interest, excludes blocked or declined pairs, scores each pair both ways, then greedily assigns highest-scoring pairs so each user receives at most one match per round.

## Supabase

Run `supabase/schema.sql` in a Supabase project to create the MVP tables, enums, constraints, and starter RLS policies.

Set these environment variables before wiring live auth:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```

## Hackathon Demo Notes

- Use the manual “Run demo match round” button for judging.
- Seeded users make the match reveal work immediately.
- In production, move the matching runner behind a service-role API route or cron job.
- Contact details should only unlock after both people opt in.
