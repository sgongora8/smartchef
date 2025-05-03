import React from 'react';
import { Utensils, AlarmClock, BookOpen } from 'lucide-react';

interface HeroProps {
  onScrollToSearch: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToSearch }) => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <span className="text-6xl md:text-7xl" role="img" aria-label="Chef emoji">👨‍🍳</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Personal AI Chef
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Get personalized recipes tailored to your dietary needs and cooking skill level. Just tell us your preferences, and let our AI do the cooking!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onScrollToSearch}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Find Recipes
            </button>
            <a 
              href="#how-it-works" 
              className="bg-white hover:bg-gray-50 text-amber-500 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              How It Works
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <Utensils className="h-6 w-6 text-amber-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Recipes</h3>
            <p className="text-gray-600">Tailored to your dietary needs and preferences</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <AlarmClock className="h-6 w-6 text-amber-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cook at Your Level</h3>
            <p className="text-gray-600">Easy, intermediate, or advanced recipes to match your skills</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <BookOpen className="h-6 w-6 text-amber-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Detailed Instructions</h3>
            <p className="text-gray-600">Step-by-step guides to create perfect meals every time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
