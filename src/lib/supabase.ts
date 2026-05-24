/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from "@supabase/supabase-js";
import { Listing, Lead, SourcingRequest, SystemLog, Platform, DealStatus } from "../types";

// Check environment variables for Supabase database connection
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || "").trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();

// True production validation flag
export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  supabaseUrl !== "YOUR_SUPABASE_URL" &&
  supabaseUrl.startsWith("https://");

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Warn developers during local development if keys are missing
if (import.meta.env.DEV && !isSupabaseConfigured) {
  console.warn(
    "[IDsvault] Supabase is not configured. " +
    "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file. " +
    "Admin access will be unavailable until these are set."
  );
}

/**
 * PRODUCTION SQL BLUEPRINT SCHEMA
 * 
 * -- Create Users/Admins Table
 * create table public.users (
 *   id uuid references auth.users not null primary key,
 *   email text not null,
 *   role text default 'user' check (role in ('user', 'admin')),
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Create Listings Table
 * create table public.listings (
 *   id text primary key,
 *   username text not null,
 *   normalized_username text not null,
 *   platform text not null,
 *   category text not null,
 *   asking_price numeric not null,
 *   min_price numeric not null,
 *   status text not null,
 *   description text,
 *   slug text not null unique,
 *   created_time timestamp with time zone default timezone('utc'::text, now()) not null,
 *   constraints unique_platform_username unique (platform, normalized_username)
 * );
 * 
 * -- Create Buyer Leads / Proposals Table
 * create table public.buyer_leads (
 *   id text primary key,
 *   listing_slug text references public.listings(slug) on delete cascade,
 *   buyer_name text not null,
 *   buyer_email text not null,
 *   whatsapp text not null,
 *   offer numeric not null,
 *   urgency text not null,
 *   notes text,
 *   status text not null,
 *   created_time timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Create Sourcing Requests Table
 * create table public.requests (
 *   id text primary key,
 *   desired_username text not null,
 *   platform text not null,
 *   budget numeric not null,
 *   urgency text not null,
 *   alternatives text,
 *   whatsapp text not null,
 *   email text not null,
 *   created_time timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Create Audit / Activity Logs Table
 * create table public.activity_logs (
 *   timestamp timestamp with time zone default timezone('utc'::text, now()) not null primary key,
 *   action text not null,
 *   detail text not null
 * );
 * 
 * -- Enable Row Level Security (RLS)
 * alter table public.listings enable row level security;
 * alter table public.buyer_leads enable row level security;
 * alter table public.requests enable row level security;
 * alter table public.activity_logs enable row level security;
 * 
 * -- Setup anonymous SELECT policies (Public browse read-only)
 * create policy "Public Listings read access" on public.listings for select using (status = 'LIVE' or status = 'OFFER_PENDING');
 * create policy "Anonymous submissions insert access" on public.buyer_leads for insert with check (true);
 * create policy "Anonymous request insert access" on public.requests for insert with check (true);
 * 
 * -- Setup Admin bypass roles for full mutations
 * create policy "Admin full list access" on public.listings for all using (true);
 * create policy "Admin full lead access" on public.buyer_leads for all using (true);
 * create policy "Admin full request access" on public.requests for all using (true);
 */

export const DATABASE_SCHEMA_SQL = `
-- IDsvault Production Database Setup
-- Run these scripts in your Supabase SQL Editor to provision the full schema.

-- ─────────────────────────────────────────────
-- 1. USERS (mirrors auth.users, stores role)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─────────────────────────────────────────────
-- 2. LISTINGS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.listings (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  normalized_username TEXT NOT NULL,
  platform TEXT NOT NULL,
  category TEXT NOT NULL,
  asking_price NUMERIC NOT NULL,
  min_price NUMERIC NOT NULL,
  status TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_platform_username UNIQUE (platform, normalized_username)
);

-- ─────────────────────────────────────────────
-- 3. BUYER LEADS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.buyer_leads (
  id TEXT PRIMARY KEY,
  listing_slug TEXT NOT NULL REFERENCES public.listings(slug) ON DELETE CASCADE,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  offer NUMERIC NOT NULL,
  urgency TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL,
  created_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─────────────────────────────────────────────
-- 4. SOURCING REQUESTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.requests (
  id TEXT PRIMARY KEY,
  desired_username TEXT NOT NULL,
  platform TEXT NOT NULL,
  budget NUMERIC NOT NULL,
  urgency TEXT NOT NULL,
  alternatives TEXT,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  created_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─────────────────────────────────────────────
-- 5. ACTIVITY LOGS  (UUID pk avoids duplicate-ts inserts)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  action TEXT NOT NULL,
  detail TEXT NOT NULL
);

-- ─────────────────────────────────────────────
-- 6. PERFORMANCE INDEXES
-- ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_listings_status   ON public.listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_platform ON public.listings(platform);
CREATE INDEX IF NOT EXISTS idx_leads_listing_slug ON public.buyer_leads(listing_slug);
CREATE INDEX IF NOT EXISTS idx_logs_timestamp    ON public.activity_logs(timestamp DESC);

-- ─────────────────────────────────────────────
-- 7. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
ALTER TABLE public.listings      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buyer_leads   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users         ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────
-- 8. HELPER: is_admin()
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- ─────────────────────────────────────────────
-- 9. POLICIES
-- ─────────────────────────────────────────────

-- Listings: public read of live/offer-pending; admin full CRUD
CREATE POLICY "Public browse live listings"
  ON public.listings FOR SELECT
  USING (status IN ('LIVE', 'OFFER_PENDING') OR public.is_admin());

CREATE POLICY "Admin manage listings"
  ON public.listings FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Buyer leads: anonymous INSERT (anyone may submit a proposal); admin full access
CREATE POLICY "Anonymous submit proposals"
  ON public.buyer_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin manage leads"
  ON public.buyer_leads FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Sourcing requests: anonymous INSERT; admin full access
CREATE POLICY "Anonymous submit sourcing"
  ON public.requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin manage requests"
  ON public.requests FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Activity logs: admin only
CREATE POLICY "Admin manage logs"
  ON public.activity_logs FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Users: each user can read their own row; admin can read all
CREATE POLICY "Users read own profile"
  ON public.users FOR SELECT
  USING (id = auth.uid() OR public.is_admin());
`;
