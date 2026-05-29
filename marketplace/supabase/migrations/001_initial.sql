-- IDsvault marketplace schema
-- Run via: Supabase Dashboard → SQL Editor → paste → Run

-- ─── Listings ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS listings (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle      text NOT NULL,
  price_inr   integer NOT NULL,
  followers   integer,
  niche       text,
  char_length integer GENERATED ALWAYS AS (length(handle)) STORED,
  description text,
  status      text NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','live','reserved','paid','completed')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ON listings (status);
CREATE INDEX ON listings (niche);
CREATE INDEX ON listings (char_length);
CREATE INDEX ON listings (price_inr);

-- ─── Reservations ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id      uuid NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  buyer_telegram  text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── Bot conversation state (for /sell flow) ───────────────────────────────
CREATE TABLE IF NOT EXISTS bot_sessions (
  chat_id    bigint PRIMARY KEY,
  step       text,
  data       jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ─── RLS ───────────────────────────────────────────────────────────────────
ALTER TABLE listings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_sessions ENABLE ROW LEVEL SECURITY;

-- Anon: read-only on live listings
CREATE POLICY "public read live listings"
  ON listings FOR SELECT
  TO anon
  USING (status = 'live');

-- Service role bypasses RLS automatically — no extra policy needed.
-- (the service role key is only used server-side in the bot)

-- ─── Seed a demo listing so the UI isn't empty ─────────────────────────────
INSERT INTO listings (handle, price_inr, followers, niche, description, status)
VALUES
  ('goalgrip',    29000, 4200, 'sports',   'Punchy sports-themed handle — ideal for fitness or football brands.', 'live'),
  ('offsmell',    40000, 1800, 'lifestyle', 'Distinctive, brandable — fragrance or creative niche.', 'live'),
  ('xbigbull',    20000,  900, 'finance',   'Markets-themed handle for trading or investing content.', 'live'),
  ('deshlaughs',  18000, 3100, 'comedy',    'Ready-made comedy handle for desi humour brands.', 'live'),
  ('oncewrong',   22000, 2400, 'brandable', 'Memorable two-word brandable handle.', 'live');
