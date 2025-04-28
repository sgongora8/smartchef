import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import Footer from './components/Footer';
import { Recipe, RecipeFormData } from './types';
import { generateRecipe } from './utils/mockRecipeAPI';
import SignIn from './components/SignIn';

function App() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);

  const handleFormSubmit = async (formData: RecipeFormData) => {
    setIsLoading(true);
    setShowRecipe(false);

    try {
      const selectedPreferences = formData.dietaryPreferences
        .filter(pref => pref.selected)
        .map(pref => pref.id);

      const generatedRecipe = await generateRecipe(
        selectedPreferences,
        formData.cookingLevel,
        formData.additionalNotes
      );

      setRecipe(generatedRecipe);
      setShowRecipe(true);

      setTimeout(() => {
        document.getElementById('recipe-result')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    } catch (error) {
      console.error('Failed to generate recipe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div id="recipe-form" className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                  <RecipeForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                </div>
              </div>
              {showRecipe && (
                <div id="recipe-result" className="container mx-auto px-4 py-16">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                      Your Personalized Recipe
                    </h2>
                    <RecipeDisplay recipe={recipe} />
                  </div>
                </div>
              )}
            </>
          } />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
