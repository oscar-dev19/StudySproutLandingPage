'use client';

import { useState, useEffect } from 'react';

export function useWaitlist() {
  const [entries, setEntries] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch('/api/waitlist/count');
        if (res.ok) {
          const data = await res.json();
          setEntries(data.count);
        }
      } catch {
        // Silently fail - not critical
      } finally {
        setLoading(false);
      }
    }
    fetchCount();
  }, []);

  return { count: entries, loading, error };
}

export function useReferralCode() {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      setCode(ref);
    }
    setLoading(false);
  }, []);

  return { referralCode: code, loading };
}
