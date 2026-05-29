# IDsvault Marketplace

Broker-assisted Instagram username marketplace — Next.js 15 + Supabase + Telegram bot + Mini App.

## Stack

- **Next.js 15** (App Router, server components, React 19)
- **Supabase** (PostgreSQL + Row Level Security)
- **Tailwind CSS v4**
- **Telegram Bot** (webhook, serverless) + **Mini App** (web app inside Telegram)
- Deployed on **Vercel**

---

## 1. Environment Setup

Copy `.env.local.example` to `.env.local` and fill in:

```env
TELEGRAM_BOT_TOKEN=          # from @BotFather
TELEGRAM_BOT_USERNAME=       # your bot's @username (without @)
TELEGRAM_ADMIN_CHAT_ID=      # your personal Telegram chat ID
NEXT_PUBLIC_SUPABASE_URL=    # from Supabase project dashboard
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # Settings → API → service_role
NEXT_PUBLIC_APP_URL=https://idsvault.com
WEBHOOK_SETUP_SECRET=        # random string, e.g. openssl rand -hex 16
```

> ⚠️ **Get your Telegram chat ID**: message `@userinfobot` on Telegram.

---

## 2. Supabase Migration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste the contents of `supabase/migrations/001_initial.sql`
3. Click **Run**

This creates:
- `listings` table (with RLS: anon = SELECT live only)
- `reservations` table
- `bot_sessions` table (conversation state for /sell flow)
- 5 seed listings

---

## 3. Local Development

```bash
cd marketplace
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The Telegram Mini App requires HTTPS — test it locally using [ngrok](https://ngrok.com):
> ```bash
> ngrok http 3000
> # Set NEXT_PUBLIC_APP_URL to the ngrok URL in .env.local
> ```

---

## 4. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from the marketplace/ directory)
vercel

# Set environment variables
vercel env add TELEGRAM_BOT_TOKEN
vercel env add TELEGRAM_ADMIN_CHAT_ID
# ... (repeat for all vars)

# Production deploy
vercel --prod
```

**Vercel project settings if deploying from the monorepo root:**
- Root Directory: `marketplace`
- Build Command: `npm run build`
- Output Directory: `.next`

---

## 5. Register the Telegram Webhook

After deploying to Vercel, call the setup route once:

```
GET https://idsvault.com/api/telegram/setup-webhook?secret=YOUR_WEBHOOK_SETUP_SECRET
```

This registers:
1. The webhook URL with Telegram
2. The bot's menu button (opens the Mini App)
3. Bot commands (/start, /browse, /sell)

You should see `{"ok":true,"results":{...}}`. Check that `webhook.result` is `true`.

---

## 6. Telegram Bot Commands

**Public:**
- `/start` — Welcome message + Mini App button
- `/browse` — List live handles with Reserve inline buttons
- `/sell` — Step-by-step form to submit a handle for listing

**Admin only** (your `TELEGRAM_ADMIN_CHAT_ID`):
- `/approve <listing_id>` — Publish a pending listing
- `/paid <listing_id>` — Mark payment received
- `/done <listing_id>` — Mark transfer complete

---

## 7. Telegram Mini App

The Mini App lives at `/mini-app` (excluded from SEO indexing).

**Features:**
- Browse live listings with niche/sort filters
- Tap any listing to see details
- Reserve button → validates Telegram initData HMAC → creates reservation in Supabase → notifies buyer + admin

**To open the Mini App:**
- Via bot menu button (set up by the setup-webhook route)
- Direct link: `https://t.me/<botusername>/app`
- From a listing page: "Open in Telegram App" button

---

## 8. Adding New Listings (Admin)

Three ways:
1. **Bot:** A seller runs /sell in Telegram → you receive a notification → run `/approve <id>`
2. **Supabase SQL Editor:** `INSERT INTO listings (handle, price_inr, followers, niche, description, status) VALUES (..., 'live');`
3. **Supabase Table Editor:** Add a row directly in the dashboard

---

## 9. SEO Pages

| URL | Purpose | Indexed |
|-----|---------|---------|
| `/` | Home | ✅ |
| `/buy-instagram-usernames` | Main browse page | ✅ |
| `/og-instagram-handles` | OG category | ✅ |
| `/4-letter-instagram-usernames` | 4-char category | ✅ |
| `/short-instagram-handles-india` | ≤6 char category | ✅ |
| `/blog` | Blog index | ✅ |
| `/blog/[slug]` | Blog posts | ✅ |
| `/how-it-works` | Process | ✅ |
| `/faq` | FAQ | ✅ |
| `/about` | About | ✅ |
| `/listing/[id]` | Listing detail | ❌ noindex |
| `/mini-app` | Telegram Mini App | ❌ noindex |

---

## Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` is used only in server-side API routes — never exposed to browser
- Mini App reservations are validated via HMAC of Telegram's `initData` before any DB write
- Admin bot commands only execute when the sender's chat ID matches `TELEGRAM_ADMIN_CHAT_ID`
- Payments are handled entirely off-platform — no payment keys, no Stripe, no escrow code
