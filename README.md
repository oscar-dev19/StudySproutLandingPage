# StudySprout Beta Waitlist

A clean, calm landing page for joining the StudySprout beta waitlist with referral rewards.

## Features

- **Clean, Forest-like Design** - Minimal and calm aesthetic
- **Waitlist Signup** - Email, platform, and priority collection
- **Referral System** - Unique referral codes for each signup
- **Reward Tiers** - Encourage referrals with escalating rewards
- **Analytics Ready** - Plausible analytics integration

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Netlify Hosting

## Setup

### 1. Clone and install

```bash
npm install
```

### 2. Set up Supabase

1. Create a free project at [Supabase](https://supabase.com)
2. Go to the SQL Editor and run the contents of `supabase/schema.sql`
3. Go to Settings > API and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role secret → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials.

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Add environment variables in Site Settings > Environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

#### Configure Custom Domain

1. Go to Domain Settings > Add custom domain
2. Enter your domain (e.g., `studysprout.com` or `app.studysprout.com`)
3. Netlify will show DNS records to add to your domain registrar:

For **root domain** (studysprout.com):
```
Type: A
Name: @
Value: 75.2.70.75
```

For **www subdomain**:
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

For **other subdomains** (app.studysprout.com):
```
Type: CNAME
Name: app
Value: your-site.netlify.app
```

4. Add the records in your domain registrar
5. Netlify will auto-provision SSL certificates

### Supabase Setup

The database schema includes:
- `waitlist` table with email, platform, priority, referral tracking
- Auto-incrementing position for waitlist ordering
- Referral count tracking
- Row Level Security for data protection

## Referral System

Each waitlist member gets a unique referral code. When someone signs up with `?ref=CODE`:
- The referrer gets their referral count incremented
- The new signup is tracked as referred
- Referral links are displayed after signup

## Reward Tiers

| Referrals | Reward |
|-----------|--------|
| 1 | Priority Access (50 spots up) |
| 3 | Beta Features early access |
| 5 | 1 month Pro free |
| 10 | 25% discount forever |
| 25 | Lifetime Pro membership |

## License

MIT
