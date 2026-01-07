export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-forest-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-forest-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="font-display text-xl text-forest-900">StudySprout</span>
        </div>
        <nav className="hidden sm:flex items-center gap-8">
          <a href="#features" className="text-forest-600 hover:text-forest-800 transition-colors text-sm">
            Features
          </a>
          <a href="#rewards" className="text-forest-600 hover:text-forest-800 transition-colors text-sm">
            Rewards
          </a>
          <a
            href="#join"
            className="px-4 py-2 bg-forest-600 text-white text-sm rounded-lg hover:bg-forest-700 transition-colors"
          >
            Join Beta Waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
