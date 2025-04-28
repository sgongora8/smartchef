import React from 'react';
import { DietaryPreference } from '../types';

interface DietaryPreferencesProps {
  preferences: DietaryPreference[];
  onChange: (id: string, selected: boolean) => void;
}

const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({ preferences, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Dietary Preferences</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {preferences.map((preference) => (
          <div 
            key={preference.id}
            className="flex items-center"
          >
            <input
              type="checkbox"
              id={`pref-${preference.id}`}
              checked={preference.selected}
              onChange={() => onChange(preference.id, !preference.selected)}
              className="w-4 h-4 text-amber-500 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
            />
            <label 
              htmlFor={`pref-${preference.id}`}
              className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
            >
              {preference.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietaryPreferences;