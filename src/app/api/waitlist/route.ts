import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration missing');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

function generateReferralCode(): string {
  return crypto.randomBytes(4).toString('hex');
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, platform, priority, referred_by } = body;

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!platform) {
      return NextResponse.json(
        { error: 'Please select a platform' },
        { status: 400 }
      );
    }

    const validPlatforms = ['ios', 'android', 'web', 'desktop', 'all'];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform selected' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: existingEntry } = await supabase
      .from('waitlist')
      .select('id, referral_code')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (existingEntry) {
      return NextResponse.json({
        id: existingEntry.id,
        referral_code: existingEntry.referral_code,
        message: 'You\'re already on the waitlist!',
      });
    }

    const referralCode = generateReferralCode();

    const { data: newEntry, error } = await supabase
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        platform,
        priority: validPriorities.includes(priority) ? priority : 'interested',
        referral_code: referralCode,
        referred_by: referred_by || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      );
    }

    if (referred_by) {
      await supabase.rpc('increment_referrals', { referral_code: referred_by });
    }

    return NextResponse.json({
      id: newEntry.id,
      referral_code: newEntry.referral_code,
      position: newEntry.position,
      message: 'Successfully joined the waitlist!',
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to join the waitlist' });
}

const validPriorities = ['early', 'interested', 'researching'];
