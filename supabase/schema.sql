-- Supabase SQL Schema for StudySprout Waitlist
-- Run this in your Supabase SQL Editor

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  platform TEXT NOT NULL DEFAULT 'all',
  priority TEXT NOT NULL DEFAULT 'interested',
  referral_code TEXT NOT NULL UNIQUE,
  referred_by TEXT,
  referrals_count INTEGER NOT NULL DEFAULT 0,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);

-- Function to get the next position number
CREATE OR REPLACE FUNCTION get_next_position()
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE((SELECT MAX(position) FROM waitlist), 0) + 1;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-set position on insert
CREATE OR REPLACE FUNCTION set_waitlist_position()
RETURNS TRIGGER AS $$
BEGIN
  NEW.position = get_next_position();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger (run this separately if needed, or drop and recreate)
DROP TRIGGER IF EXISTS set_position_on_insert ON waitlist;
CREATE TRIGGER set_position_on_insert
  BEFORE INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION set_waitlist_position();

-- Function to increment referrals count
CREATE OR REPLACE FUNCTION increment_referrals(p_referral_code TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE waitlist
  SET referrals_count = referrals_count + 1
  WHERE referral_code = p_referral_code;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your use case)
-- Allow public read access for waitlist count
CREATE POLICY "Allow public count access" ON waitlist
  FOR SELECT
  USING (true);

-- Only allow inserts (no updates/deletes from client)
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Note: Update and delete should only be allowed through server-side operations
-- using the service role key, not through RLS policies
