import React from 'react';
import { Recipe } from '../types';
import { Clock, Users, ChefHat, BookmarkPlus } from 'lucide-react';

interface RecipeDisplayProps {
  recipe: Recipe | null;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative h-48 md:h-64 overflow-hidden bg-amber-100">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
            <span className="text-6xl">👨‍🍳</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
          <button 
            className="text-amber-500 hover:text-amber-600 transition-colors"
            aria-label="Save recipe"
          >
            <BookmarkPlus size={24} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-1 text-amber-500" />
            <span>{recipe.cookTime} mins</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users size={18} className="mr-1 text-amber-500" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center text-gray-600">
            <ChefHat size={18} className="mr-1 text-amber-500" />
            <span className="capitalize">{recipe.level}</span>
          </div>
        </div>
        
        {recipe.dietary.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {recipe.dietary.map((diet) => (
                <span 
                  key={diet}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                >
                  {diet}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex text-gray-700">
                <span className="font-medium mr-2">{ingredient.amount} {ingredient.unit}</span>
                <span>{ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Instructions</h3>
          <ol className="space-y-4">
            {recipe.steps.map((step) => (
              <li key={step.step} className="flex">
                <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-semibold text-sm mr-3 flex-shrink-0">
                  {step.step}
                </span>
                <span className="text-gray-700">{step.instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;