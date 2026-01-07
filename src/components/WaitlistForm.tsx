'use client';

import { useState, useEffect } from 'react';

const PLATFORMS = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'web', label: 'Web App' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'all', label: 'All Platforms' },
];

const PRIORITIES = [
  { value: 'early', label: 'Early Adopter', description: 'Want it first, happy to provide feedback' },
  { value: 'interested', label: 'Interested', description: 'Curious but want to see more first' },
  { value: 'researching', label: 'Researching', description: 'Just exploring options' },
];

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('all');
  const [priority, setPriority] = useState('interested');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      setReferralCode(ref);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          platform,
          priority,
          referred_by: referralCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      if (data.referral_code) {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        setReferralLink(`${baseUrl}?ref=${data.referral_code}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join waitlist');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-display text-forest-900">You're on the list!</h3>
          <p className="text-forest-600">
            Thanks for joining. We'll notify you when it's your turn.
          </p>
          {referralLink && (
            <div className="mt-6 p-4 bg-forest-50 rounded-lg">
              <p className="text-sm text-forest-700 mb-2">Boost your position by referring friends:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 px-3 py-2 text-sm bg-white border border-forest-200 rounded-md text-forest-800"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(referralLink)}
                  className="px-3 py-2 text-sm bg-forest-600 text-white rounded-md hover:bg-forest-700 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-forest-700 mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 border border-forest-200 rounded-lg text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-forest-700 mb-2">
          Platform
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full px-4 py-3 border border-forest-200 rounded-lg text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all bg-white"
        >
          {PLATFORMS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-forest-700 mb-3">
          Priority Level
        </label>
        <div className="space-y-3">
          {PRIORITIES.map((p) => (
            <label
              key={p.value}
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                priority === p.value
                  ? 'border-forest-400 bg-forest-50'
                  : 'border-forest-200 hover:border-forest-300'
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={p.value}
                checked={priority === p.value}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 text-forest-600 focus:ring-forest-400"
              />
              <div className="ml-3">
                <span className="block font-medium text-forest-800">{p.label}</span>
                <span className="block text-sm text-forest-500">{p.description}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 px-6 bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Joining...' : 'Join Beta Waitlist'}
      </button>

      <p className="text-xs text-center text-forest-400">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
}
