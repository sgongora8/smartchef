import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-amber-500">SmartChef Blog</h1>

        <div className="space-y-8">
          <article>
            <h2 className="text-2xl font-semibold mb-2">Top 5 Easy Dinners for Busy Weeknights</h2>
            <p className="text-gray-700">
              After a long day, you deserve a delicious dinner without the hassle. Discover quick recipes like one-pot pasta, sheet pan chicken, and stir-fries ready in under 30 minutes!
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-2">Meal Prep 101: Save Time and Eat Healthy</h2>
            <p className="text-gray-700">
              Learn how meal prepping can simplify your week. We cover tips like batch-cooking grains, prepping veggies, and storing meals safely for maximum freshness.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-2">The Secret to Perfect Pasta Every Time</h2>
            <p className="text-gray-700">
              Ever wonder why restaurant pasta tastes better? Learn about seasoning water, timing, and sauce techniques that elevate your pasta dishes at home.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;
