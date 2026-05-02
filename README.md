# ANU Match MVP

A hackathon MVP for a calmer ANU dating app. Students verify an `@anu.edu.au` email, answer structured compatibility questions, and receive one scheduled match instead of swiping.

## Problem

Traditional dating apps can feel especially draining for university students:

- People are judged by anonymous strangers through fast profile decisions.
- Swiping can become emotionally exhausting and time-consuming.
- Texting often turns into overthinking, performance, and strategy.
- Quick visual judgement can crowd out more authentic connection.

ANU Match reframes dating as a scheduled, university-verified introduction. The product asks what people value, matches on compatibility, and gives users control over whether contact is revealed.

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

Open `http://127.0.0.1:3000`.

## MVP Flow

1. Visit the landing page and click the registration call-to-action.
2. Enter basic profile details with an `@anu.edu.au` email.
3. Answer Date Drop-inspired compatibility topics using explicit 1-7 choices for both yourself and your ideal match.
4. Join the next matching round.
5. Run the demo matching round.
6. Review the generated match and opt in to connect.

The current UI uses browser local storage plus seeded ANU users for the hackathon demo. The production path should wire Supabase Auth to the same profile and matching concepts.

## Routes

- `/`: landing page.
- `/register`: basic registration details.
- `/questions`: one compatibility question series with self and ideal-match answers.
- `/match`: demo round and match reveal.

## Matching Algorithm

Each user has:

- `selfAnswers`: what they are like.
- `preferenceAnswers`: what they want in a partner.

The matcher filters out ineligible users, enforces mutual gender interest, excludes blocked or declined pairs, scores each pair both ways, then greedily assigns highest-scoring pairs so each user receives at most one match per round.

## Question Model

The questionnaire is modelled on themes from Date Drop's MIT State of Dating report: intellectual challenge, communication frequency, growth mindset, quality time, appreciation, drinking and weed comfort, active lifestyle, money attitudes, morning/night preferences, career balance, and children preferences.

## Supabase

Run `supabase/schema.sql` in a Supabase project to create the MVP tables, enums, constraints, and starter RLS policies.

Set these environment variables before wiring live auth:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```

## Vercel Deployment

The project includes `vercel.json` with Next.js build settings. To deploy:

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Use Node 24. The repo includes `.node-version`, `.nvmrc`, and `package.json` engines.
4. Add Supabase/Resend environment variables when you wire live auth and email.
5. Deploy with the default Vercel Next.js settings.

## Hackathon Demo Notes

- Use the manual "Run this week's match" button for judging.
- Seeded users make the match reveal work immediately.
- In production, move the matching runner behind a service-role API route or cron job.
- Contact details should only unlock after both people opt in.
