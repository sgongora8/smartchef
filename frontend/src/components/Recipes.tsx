// frontend/src/components/Recipes.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types';

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json() as Promise<Recipe[]>;
      })
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load recipes.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-center">Loading recipes…</p>;
  if (error)   return <p className="p-4 text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">All Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(r => (
          <Link
            key={r._id ?? r.name}
            to={`/recipes/${encodeURIComponent(r.name)}`}
            className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{r.name}</h3>
            {r.description && (
              <p className="text-gray-600 mb-4">{r.description}</p>
            )}
            <ul className="list-disc list-inside mb-4 text-sm text-gray-700">
              {r.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
