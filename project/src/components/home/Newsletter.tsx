import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <section className="py-16 bg-neutral-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Mail className="h-12 w-12 text-gold-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            Stay in Style
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive access to new collections, 
            styling tips, and special offers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-full bg-white text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-gold-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </form>

        {isSubscribed && (
          <p className="mt-4 text-gold-400 animate-fade-in">
            Thank you for subscribing! Check your email for confirmation.
          </p>
        )}

        <p className="mt-6 text-sm text-neutral-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}