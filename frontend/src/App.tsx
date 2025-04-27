import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import Footer from './components/Footer';
import { Recipe, RecipeFormData } from './types';
import { generateRecipe } from './utils/mockRecipeAPI';

function App() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);

  const handleFormSubmit = async (formData: RecipeFormData) => {
    setIsLoading(true);
    setShowRecipe(false);
    
    try {
      // Get selected dietary preferences
      const selectedPreferences = formData.dietaryPreferences
        .filter(pref => pref.selected)
        .map(pref => pref.id);
      
      // Generate recipe based on form data
      const generatedRecipe = await generateRecipe(
        selectedPreferences,
        formData.cookingLevel,
        formData.additionalNotes
      );
      
      setRecipe(generatedRecipe);
      setShowRecipe(true);
      
      // Scroll to recipe after a small delay
      setTimeout(() => {
        document.getElementById('recipe-result')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      console.error('Failed to generate recipe:', error);
      // Would handle error state in a real app
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <div id="recipe-form" className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <RecipeForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        </div>
        
        {showRecipe && (
          <div 
            id="recipe-result" 
            className="container mx-auto px-4 py-16 transition-all duration-500 ease-in-out"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Personalized Recipe</h2>
              <RecipeDisplay recipe={recipe} />
            </div>
          </div>
        )}
        
        <div id="how-it-works" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How SmartChef Works</h2>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Tell Us Your Preferences</h3>
                    <p className="text-gray-600">Select your dietary restrictions, cooking skill level, and any specific ingredients you want to use.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Our AI Works Its Magic</h3>
                    <p className="text-gray-600">Our AI analyzes thousands of recipes to find the perfect match for your preferences.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Your Personalized Recipe</h3>
                    <p className="text-gray-600">Receive a complete recipe with ingredients, step-by-step instructions, and cooking tips.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;