import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-amber-50 p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold mb-2">1. Choose Your Preferences</h3>
            <p>Tell us your dietary needs, favorite cuisines, and skill level.</p>
          </div>
          <div className="bg-amber-50 p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">2. AI Generates Recipes</h3>
            <p>Our AI crafts personalized recipes just for you in seconds.</p>
          </div>
          <div className="bg-amber-50 p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl mb-4">👩‍🍳</div>
            <h3 className="text-xl font-semibold mb-2">3. Cook & Enjoy</h3>
            <p>Follow step-by-step instructions to create delicious meals.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
