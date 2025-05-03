import React, { useEffect, useState } from 'react';
import { Clock, ChefHat, Bookmark, BookmarkCheck } from 'lucide-react';
import NutritionQueryBar from './NutritionQueryBar';
import { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe | null;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!recipe?._id) return;
      try {
        const res = await fetch('/api/users/favorites', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const favorites: Recipe[] = await res.json();
        setIsSaved(favorites.some((r) => r._id === recipe._id));
      } catch (err) {
        console.error('Fetch favorites error:', err);
      }
    };
    checkIfSaved();
  }, [recipe]);


  const handleToggleSave = async () => {
    if (!recipe?._id) return;
    try {
      const res = await fetch(`/api/users/favorites/${recipe._id}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Toggle failed');
      }
      setIsSaved((prev) => !prev);
    } catch (err: any) {
      console.error('Toggle favorite error:', err);
      alert(err.message);
    }
  };

  if (!recipe) return null;

  
  const rawSteps = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : (recipe.instructions || '').split('\n').filter((s) => s.trim());

  const cleanedSteps = rawSteps.map((step) =>
    step.replace(/^\s*\d+\.\s*/, '').trim()
  );

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow">
      {/* Hero image */}
      <div className="relative h-64">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-amber-100 flex items-center justify-center text-6xl">
            👨‍🍳
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Title + Bookmark */}
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
          <button
            onClick={handleToggleSave}
            title={isSaved ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isSaved ? (
              <BookmarkCheck className="text-amber-500" />
            ) : (
              <Bookmark className="text-gray-400 hover:text-amber-500 transition" />
            )}
          </button>
        </div>

        {/* Description */}
        {recipe.description && (
          <p className="text-gray-600 mt-2">{recipe.description}</p>
        )}

        {/* Time + Skill */}
        <div className="flex gap-4 mt-4 text-gray-600">
          {recipe.cookingTime && (
            <span className="flex items-center gap-1">
              <Clock size={18} /> {recipe.cookingTime} mins
            </span>
          )}
          {recipe.skillLevel && (
            <span className="flex items-center gap-1">
              <ChefHat size={18} /> {recipe.skillLevel}
            </span>
          )}
        </div>

        {/* Dietary tags */}
        {Array.isArray(recipe.dietaryInfo) && recipe.dietaryInfo.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.dietaryInfo.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Ingredients & Instructions */}
        <div className="mt-6">
          {/* Ingredients */}
          <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside mb-4">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>

          {/* Instructions */}
          <h3 className="text-xl font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-1">
            {cleanedSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Nutrition query footer */}
      <div className="p-6 border-t bg-gray-50">
        <h3 className="text-lg font-bold mb-2">Ask about this recipe’s nutrition:</h3>
        <NutritionQueryBar recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeDisplay;
