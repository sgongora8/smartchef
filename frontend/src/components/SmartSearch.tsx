import React, { useRef, useState, useEffect } from 'react';
import { Recipe } from '../types';

const dietaryOptions = [
  'vegan', 'vegetarian', 'keto', 'paleo',
  'gluten-free', 'dairy-free', 'halal', 'kosher'
];

const experienceOptions = ['beginner', 'intermediate', 'advanced'];

interface NutritionData {
  description: string;
  labelNutrients: Record<string, { value: number }>;
}

interface Props {
  onSelectRecipe: (recipe: Recipe) => void;
}

const nutrientUnits: Record<string, string> = {
  fat: 'g',
  saturatedFat: 'g',
  transFat: 'g',
  cholesterol: 'mg',
  sodium: 'mg',
  carbohydrates: 'g',
  fiber: 'g',
  sugars: 'g',
  protein: 'g',
  calcium: 'mg',
  iron: 'mg',
  potassium: 'mg',
  calories: 'kcal',
};

const formatLabel = (key: string) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());

const SmartSearch: React.FC<Props> = ({ onSelectRecipe }) => {
  // recipe search state
  const [ingredients, setIngredients] = useState('');
  const [allergies, setAllergies] = useState('');
  const [dietary, setDietary] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [results, setResults] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // preferences load/save
  useEffect(() => {
    fetch('/api/auth/current_user', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (data?.email) {
          setUserLoggedIn(true);
          fetchPreferences();
        }
      });
  }, []);

  const fetchPreferences = async () => {
    try {
      const res = await fetch('/api/users/preferences', { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setDietary(data.dietaryPreferences || []);
        setAllergies(data.allergies || '');
      }
    } catch (e) {
      console.error('load prefs', e);
    }
  };

  const savePreferences = async () => {
    if (!userLoggedIn) {
      alert('Please sign in to save preferences.');
      return;
    }
    try {
      const res = await fetch('/api/users/save-preferences', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dietaryPreferences: dietary, allergies })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');
      alert('Preferences saved!');
    } catch (e: any) {
      console.error('save prefs', e);
      alert(e.message);
    }
  };

  // scroll-to-self on hash
  const formRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.location.hash === '#recipe-form') {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // recipe search
  const handleSearch = async () => {
    setError('');
    setHasSearched(false);

    const params = new URLSearchParams();
    if (ingredients) params.append('ingredients', ingredients);
    if (dietary.length) params.append('diet', dietary.join(','));

    if (experience.length) {
      const levels = experience.map(e =>
        e === 'advanced'
          ? 'Advanced'
          : e.charAt(0).toUpperCase() + e.slice(1)
      );
      params.append('level', levels.join(','));
    }

    if (allergies) params.append('allergies', allergies);

    try {
      const res = await fetch(`/api/recipes/search?${params.toString()}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Bad response');
      setResults(data);
      setHasSearched(true);
    } catch (e: any) {
      console.error('search', e);
      setError('Search failed, please try again.');
    }
  };

  // nutrition lookup UI
  const [showNutrition, setShowNutrition] = useState(false);
  const [nutritionQuery, setNutritionQuery] = useState('');
  const [nutritionResult, setNutritionResult] = useState<NutritionData | null>(null);
  const [nutritionError, setNutritionError] = useState('');

  const handleNutritionLookup = async () => {
    setNutritionError('');
    setNutritionResult(null);
    if (!nutritionQuery.trim()) {
      setNutritionError('Enter an ingredient');
      return;
    }
    try {
      const res = await fetch(`/api/nutrition/${encodeURIComponent(nutritionQuery)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lookup failed');
      setNutritionResult(data);
    } catch (e: any) {
      console.error(' nutri', e);
      setNutritionError(e.message);
    }
  };

  const toggleCheck = (val: string, arr: string[], setter: (s: string[]) => void) =>
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  return (
    <section ref={formRef} id="recipe-form" className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Smart Recipe Search</h2>

      <div className="space-y-4">
        {/* Ingredients */}
        <input
          type="text"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          placeholder="e.g. tomato, garlic, chicken"
          className="w-full border p-3 rounded"
        />

        {/* Dietary */}
        <div>
          <label className="block font-semibold mb-2">Dietary Preferences:</label>
          <div className="flex flex-wrap gap-4">
            {dietaryOptions.map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={dietary.includes(opt)}
                  onChange={() => toggleCheck(opt, dietary, setDietary)}
                />
                <span className="capitalize">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Skill level */}
        <div>
          <label className="block font-semibold mb-2">Cooking Skill Level:</label>
          <div className="flex gap-4">
            {experienceOptions.map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.includes(opt)}
                  onChange={() => toggleCheck(opt, experience, setExperience)}
                />
                <span className="capitalize">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <input
          type="text"
          value={allergies}
          onChange={e => setAllergies(e.target.value)}
          placeholder="Allergies (comma separated)"
          className="w-full border p-3 rounded"
        />

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mt-2">
          <button
            onClick={handleSearch}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded"
          >
            Find Recipes
          </button>
          <button
            onClick={() => setShowNutrition(x => !x)}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Ingredient Nutrition
          </button>
          <button
            onClick={savePreferences}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Save Preferences
          </button>
        </div>

        {/* Nutrition lookup */}
        {showNutrition && (
          <div className="mt-4 p-4 bg-gray-50 rounded space-y-3">
            <h3 className="text-lg font-semibold">Ingredient Nutrition</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={nutritionQuery}
                onChange={e => setNutritionQuery(e.target.value)}
                placeholder="e.g. apple"
                className="flex-1 border p-2 rounded"
              />
              <button
                onClick={handleNutritionLookup}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Go
              </button>
            </div>
            {nutritionError && <p className="text-red-500">{nutritionError}</p>}
            {nutritionResult && (
              <div className="text-sm text-gray-700">
                <p className="font-bold uppercase mb-2">
                  {nutritionResult.description}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(nutritionResult.labelNutrients).map(
                    ([key, nut]) => (
                      <li key={key}>
                        {formatLabel(key)}: {nut.value}
                        {nutrientUnits[key] && ` ${nutrientUnits[key]}`}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Recipe results */}
      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">Results:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(r => (
              <li
                key={r._id}
                onClick={() => onSelectRecipe(r)}
                className="bg-gray-100 p-4 rounded shadow hover:bg-gray-200 cursor-pointer"
              >
                <h4 className="font-semibold mb-1">{r.name}</h4>
                <p className="text-sm text-gray-600">
                  {r.ingredients?.slice(0, 5).join(', ')}…
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No-results message */}
      {hasSearched && results.length === 0 && !error && (
        <p className="mt-6 text-center text-gray-500">
          No matching recipes found.
        </p>
      )}
    </section>
  );
};

export default SmartSearch;
