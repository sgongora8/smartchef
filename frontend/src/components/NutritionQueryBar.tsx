import React, { useState } from 'react';
import { Recipe } from '../types';

interface NutritionQueryBarProps {
  recipe: Recipe;
}

interface NutritionResult {
  description: string;
  answer: string;
}

const NutritionQueryBar: React.FC<NutritionQueryBarProps> = ({ recipe }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<NutritionResult | null>(null);

  const handleAsk = async () => {
    setError('');
    setResult(null);
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/ai/nutrition', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe, question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setResult(data as NutritionResult);
    } catch (e: any) {
      console.error('Nutrition lookup error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask about this recipe..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? '…' : 'Ask AI'}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="mt-2 text-sm text-gray-800">
          <p className="italic mb-2">{result.answer}</p>
        </div>
      )}
    </div>
  );
};

export default NutritionQueryBar;
