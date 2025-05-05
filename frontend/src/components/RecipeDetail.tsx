// frontend/src/components/RecipeDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Recipe } from '../types';
import RecipeDisplay from './RecipeDisplay';

const RecipeDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json() as Promise<Recipe[]>;
      })
      .then(list => {
        if (name) {
          // match directly on r.name
          const found = list.find(r => r.name === name);
          setRecipe(found ?? null);
        } else {
          setRecipe(null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <p className="p-4 text-center">Loading…</p>;
  if (!recipe) return <p className="p-4 text-center text-red-500">Recipe not found.</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <RecipeDisplay recipe={recipe} />
    </div>
  );
};

export default RecipeDetail;
