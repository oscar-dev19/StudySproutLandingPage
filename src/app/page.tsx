'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WaitlistForm } from '@/components/WaitlistForm';
import { RewardTiers } from '@/components/RewardTiers';
import { useWaitlist } from '@/lib/hooks';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

function ClientContent() {
  const { count, loading: countLoading } = useWaitlist();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-forest-50/50 to-white">
        <Hero />
        
        <section id="join" className="py-20 px-6">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-xl shadow-forest-100/50 p-8 border border-forest-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-display text-forest-900 mb-2">
                  Join the Beta Waitlist
                </h2>
                {!countLoading && count !== null && (
                  <p className="text-forest-600">
                    {count.toLocaleString()} people ahead of you and counting...
                  </p>
                )}
                {countLoading && (
                  <p className="text-forest-600">Loading...</p>
                )}
              </div>
              
              <WaitlistForm />
            </div>
          </div>
        </section>

        <section id="rewards" className="py-20 px-6 bg-forest-50/50">
          <div className="max-w-5xl mx-auto">
            <RewardTiers />
          </div>
        </section>

        <section id="features" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-forest-900 mb-2">Distraction-Free</h3>
                <p className="text-forest-600 text-sm">
                  Clean, minimal interface designed to keep you focused on what matters—your learning.
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-forest-900 mb-2">Spaced Repetition</h3>
                <p className="text-forest-600 text-sm">
                  Smart scheduling that helps you remember what you learn, for longer.
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-forest-900 mb-2">Quick Capture</h3>
                <p className="text-forest-600 text-sm">
                  Instantly save notes, flashcards, and study materials as you think of them.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-forest-100">
        <div className="max-w-5xl mx-auto text-center text-forest-500 text-sm">
          <p>&copy; {new Date().getFullYear()} StudySprout. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Script
        src="https://plausible.io/js/script.js"
        data-domain="studysprout.com"
        strategy="lazyOnload"
      />
      <ClientContent />
    </>
  );
}
