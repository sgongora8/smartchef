import React from 'react';

const CookingTips: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-amber-500">Cooking Tips</h1>

        <ul className="space-y-6 list-disc list-inside text-gray-700 text-lg">
          <li><strong>Always Read Recipes First:</strong> Scan the whole recipe before starting to avoid surprises halfway through!</li>

          <li><strong>Prep Ingredients in Advance:</strong> Chop, measure, and organize your ingredients (mise en place) to cook more smoothly.</li>

          <li><strong>Use Sharp Knives:</strong> A sharp knife is safer and faster than a dull one. Invest in a basic knife sharpener.</li>

          <li><strong>Season Throughout Cooking:</strong> Don’t wait until the end — build flavor by seasoning at every step!</li>

          <li><strong>Let Meat Rest:</strong> Always let cooked meat rest for a few minutes before slicing to keep it juicy and flavorful.</li>
        </ul>
      </div>
    </div>
  );
};

export default CookingTips;
