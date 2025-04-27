import React from 'react';
import { CookingLevel } from '../types';

interface CookingLevelSelectorProps {
  selectedLevel: CookingLevel;
  onChange: (level: CookingLevel) => void;
}

const CookingLevelSelector: React.FC<CookingLevelSelectorProps> = ({ selectedLevel, onChange }) => {
  const levels: { value: CookingLevel; label: string; description: string }[] = [
    { 
      value: 'easy', 
      label: 'Easy', 
      description: 'Simple recipes with few ingredients and basic techniques' 
    },
    { 
      value: 'intermediate', 
      label: 'Intermediate', 
      description: 'More complex recipes requiring some cooking experience' 
    },
    { 
      value: 'hard', 
      label: 'Advanced', 
      description: 'Complex recipes with multiple steps and techniques' 
    }
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Cooking Experience Level</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => (
          <div 
            key={level.value}
            onClick={() => onChange(level.value)}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all duration-200
              ${selectedLevel === level.value 
                ? 'border-amber-500 bg-amber-50 shadow-sm' 
                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'}
            `}
          >
            <h4 className="font-medium text-gray-800 mb-1">{level.label}</h4>
            <p className="text-sm text-gray-600">{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CookingLevelSelector;