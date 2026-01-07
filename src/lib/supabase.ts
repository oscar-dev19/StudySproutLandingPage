import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient && supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}

export type WaitlistEntry = {
  id: string;
  email: string;
  platform: string;
  priority: string;
  referral_code: string;
  referred_by: string | null;
  referrals_count: number;
  position: number;
  created_at: string;
};

export type RewardTier = {
  referrals_needed: number;
  reward: string;
  description: string;
};
