import React, { useEffect, useState } from 'react';
import { Recipe } from '../types';
import { Clock, ChefHat, BookmarkCheck, ChevronDown, ChevronUp } from 'lucide-react';
import NutritionQueryBar from './NutritionQueryBar';

const SavedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch('/api/users/favorites', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data: Recipe[] = await res.json();
        setRecipes(data);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load saved recipes');
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);


  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  
  const handleUnsave = async (id: string) => {
    try {
      const res = await fetch(`/api/users/favorites/${id}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setRecipes(prev => prev.filter(r => r._id !== id));
    } catch (err: any) {
      console.error('Unsave error:', err);
      setError(err.message || 'Failed to remove saved recipe');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading your saved recipes...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  if (!recipes.length) {
    return <p className="text-center text-gray-600">You haven’t saved any recipes yet.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Your Saved Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map(recipe => {
          const isExpanded = expandedIds.has(recipe._id);

          const rawSteps: string[] = Array.isArray(recipe.instructions)
            ? recipe.instructions
            : (recipe.instructions || '').split('\n').filter(s => s.trim());
          const cleanedSteps = rawSteps.map(step =>
            step.replace(/^\s*\d+\.\s*/, '').trim()
          );

          return (
            <div
              key={recipe._id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden"
            >
              {/* Header & summary */}
              <div
                className="cursor-pointer"
                onClick={() => toggleExpand(recipe._id)}
              >
                <img
                  src={recipe.imageUrl || ''}
                  alt={recipe.name}
                  className="w-full h-24 object-cover"
                />
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-medium text-gray-800">
                      {recipe.name}
                    </h3>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleUnsave(recipe._id);
                      }}
                    >
                      <BookmarkCheck className="text-amber-500" size={16} />
                    </button>
                  </div>
                  <div className="flex items-center text-gray-600 text-xs mt-1">
                    {recipe.cookingTime && (
                      <span className="flex items-center mr-2">
                        <Clock size={12} /> {recipe.cookingTime}m
                      </span>
                    )}
                    {recipe.skillLevel && (
                      <span className="flex items-center">
                        <ChefHat size={12} /> {recipe.skillLevel}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs mt-2">
                    {recipe.dietaryInfo?.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-px bg-amber-100 text-amber-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="p-3 border-t">
                  <h4 className="text-sm font-semibold mb-1">Ingredients</h4>
                  <ul className="list-disc list-inside mb-2 text-sm text-gray-700">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                  <h4 className="text-sm font-semibold mb-1">Instructions</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                    {cleanedSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>

                  {/* Nutrition query section scaled down */}
                  <div className="mt-3 flex justify-center">
                    <div className="transform scale-75 origin-top">
                      <NutritionQueryBar recipe={recipe} />
                    </div>
                  </div>
                </div>
              )}

              {/* Expand/Collapse toggle */}
              <div className="p-2 border-t flex justify-center">
                <button
                  onClick={() => toggleExpand(recipe._id)}
                  className="flex items-center text-gray-500 text-xs"
                >
                  {isExpanded ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                  <span className="ml-1">
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedRecipes;
