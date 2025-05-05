import React from 'react';

export default function About() {
  return (
    <section id="about" className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 md:px-4 lg:px-0">
        <h2 className="text-4xl font-bold text-center mb-8">About SmartChef</h2>
        <div className="max-w-3xl mx-auto text-gray-700 space-y-6">
          <p>
            SmartChef is your AI-powered kitchen companion. We combine advanced machine
            learning with your personal preferences to craft recipes that are tailored
            exactly to your dietary needs, cooking skill, and taste.
          </p>
          <p>
            Whether you’re a beginner or a seasoned home chef, SmartChef makes cooking
            fun and easy by guiding you step-by-step through each recipe. No more
            guesswork—just delicious meals made your way.
          </p>
          <p>
            Our mission is simple: empower everyone to cook confidently and enjoy healthy,
            tasty food without the hassle of meal planning.
          </p>
        </div>
      </div>
    </section>
  );
}
