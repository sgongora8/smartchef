import React from 'react';

const IngredientsGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-amber-500">Ingredients Guide</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Essential Pantry Staples</h2>
            <p className="text-gray-700">
              Stocking your pantry with basics like olive oil, rice, pasta, canned tomatoes, and spices ensures you can whip up meals quickly anytime.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Fresh Produce Must-Haves</h2>
            <p className="text-gray-700">
              Always keep onions, garlic, carrots, and leafy greens on hand. They’re versatile and foundational to many dishes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Proteins for Every Diet</h2>
            <p className="text-gray-700">
              Whether you’re a meat-eater or plant-based, having proteins like chicken, tofu, lentils, or eggs will anchor your meals.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IngredientsGuide;
