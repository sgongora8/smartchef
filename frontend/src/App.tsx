import {useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Blog from './components/Blog';
import CookingTips from './components/CookingTips';
import IngredientsGuide from './components/IngredientsGuide';
import SmartSearch from './components/SmartSearch';
import SavedRecipes from './components/SavedRecipes';
import RecipeDisplay from './components/RecipeDisplay';
import { Recipe } from './types';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero onScrollToSearch={() => {
                  document.getElementById("recipe-form")?.scrollIntoView({ behavior: 'smooth' });
                  }} />


                <div className="container mx-auto px-4 py-12">
                  <div className="max-w-4xl mx-auto">
                    <SmartSearch onSelectRecipe={handleRecipeSelect} />
                  </div>
                </div>

                {selectedRecipe && (
                  <div ref={resultRef} className="container mx-auto px-4 pb-16">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Your Selected Recipe
                      </h2>
                      <RecipeDisplay recipe={selectedRecipe} />
                    </div>
                  </div>
                )}
              </>
            }
          />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cooking-tips" element={<CookingTips />} />
          <Route path="/ingredients-guide" element={<IngredientsGuide />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
