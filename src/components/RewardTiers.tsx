'use client';

import { useWaitlist } from '@/lib/hooks';

export function WaitlistCounter() {
  const { count, loading } = useWaitlist();

  if (loading) {
    return (
      <div className="h-6 bg-forest-100 rounded animate-pulse" />
    );
  }

  if (count === null) {
    return null;
  }

  return (
    <span className="text-forest-600">
      {count.toLocaleString()} people ahead of you
    </span>
  );
}

export function RewardTiers() {
  const tiers = [
    { referrals: 1, reward: 'Priority Access', description: 'Move up 50 spots in line' },
    { referrals: 3, reward: 'Beta Features', description: 'Early access to new features' },
    { referrals: 5, reward: 'Pro Month', description: '1 month of StudySprout Pro free' },
    { referrals: 10, reward: 'Lifetime Discount', description: '25% off forever' },
    { referrals: 25, reward: 'Founding Member', description: 'Lifetime Pro membership' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display text-forest-900 text-center mb-6">
        Earn Rewards
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.referrals}
            className="p-4 bg-forest-50 rounded-lg border border-forest-100 hover:border-forest-200 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-forest-200 rounded-full flex items-center justify-center text-forest-700 font-medium">
                {tier.referrals}
              </div>
              <div>
                <div className="font-medium text-forest-800">{tier.reward}</div>
                <div className="text-xs text-forest-500">
                  {tier.referrals} referral{tier.referrals > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <p className="text-sm text-forest-600">{tier.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
