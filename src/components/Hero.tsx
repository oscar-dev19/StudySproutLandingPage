export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-100 rounded-full text-forest-700 text-sm mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-forest-500 rounded-full animate-pulse" />
          Beta access coming soon
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display text-forest-900 mb-6 animate-slide-up">
          Grow your focus,<br />
          <span className="text-forest-500">sprout knowledge.</span>
        </h1>
        <p className="text-xl text-forest-600 max-w-2xl mx-auto mb-10 animate-slide-up">
          A calm, distraction-free study companion designed to help you learn deeply 
          and remember longer. Join the waitlist to be the first to know.
        </p>
      </div>
    </section>
  );
}
