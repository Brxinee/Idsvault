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
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "YOUR_SUPABASE_URL" &&
  supabaseUrl.startsWith("https://");

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
-- Run these scripts in your Supabase SQL Editor to provision your database structure with full constraints.

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

CREATE TABLE IF NOT EXISTS public.buyer_leads (
  id TEXT PRIMARY KEY,
  listing_slug TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  offer NUMERIC NOT NULL,
  urgency TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL,
  created_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

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

CREATE TABLE IF NOT EXISTS public.activity_logs (
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) PRIMARY KEY,
  action TEXT NOT NULL,
  detail TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buyer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public Listings browse" ON public.listings FOR SELECT USING (true);
CREATE POLICY "Anonymous submit proposals" ON public.buyer_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anonymous submit sourcing" ON public.requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin CRUD listings" ON public.listings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD leads" ON public.buyer_leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD requests" ON public.requests FOR ALL TO authenticated USING (true);
`;
