import React, { useState } from 'react';
import { CookingLevel, DietaryPreference, RecipeFormData } from '../types';
import CookingLevelSelector from './CookingLevelSelector';
import DietaryPreferences from './DietaryPreferences';
import { getDietaryOptions } from '../utils/mockRecipeAPI';

interface RecipeFormProps {
  onSubmit: (data: RecipeFormData) => void;
  isLoading: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, isLoading }) => {
  const [cookingLevel, setCookingLevel] = useState<CookingLevel>('easy');
  const [dietaryPreferences, setDietaryPreferences] = useState<DietaryPreference[]>(
    getDietaryOptions().map(option => ({ ...option, selected: false }))
  );
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleDietaryChange = (id: string, selected: boolean) => {
    setDietaryPreferences(
      dietaryPreferences.map(pref => 
        pref.id === id ? { ...pref, selected } : pref
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cookingLevel,
      dietaryPreferences,
      additionalNotes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Recipe</h2>
      
      <DietaryPreferences 
        preferences={dietaryPreferences} 
        onChange={handleDietaryChange} 
      />
      
      <CookingLevelSelector 
        selectedLevel={cookingLevel} 
        onChange={setCookingLevel} 
      />
      
      <div className="mb-6">
        <label htmlFor="notes" className="block text-lg font-medium text-gray-800 mb-3">
          Additional Requests
        </label>
        <textarea
          id="notes"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Any specific ingredients you want to use? Time constraints? Other preferences?"
          className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          rows={3}
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-3 px-6 text-white font-medium rounded-lg transition-all
          ${isLoading 
            ? 'bg-amber-400 cursor-wait' 
            : 'bg-amber-500 hover:bg-amber-600 shadow-md hover:shadow-lg'}
        `}
      >
        {isLoading ? 'Cooking up suggestions...' : 'Generate Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;