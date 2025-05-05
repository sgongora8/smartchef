// frontend/src/App.tsx
import { useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import SavedRecipes from './components/SavedRecipes';
import About from './components/About';
import Blog from './components/Blog';
import CookingTips from './components/CookingTips';
import IngredientsGuide from './components/IngredientsGuide';
import SignIn from './components/SignIn';
import SmartSearch from './components/SmartSearch';
import RecipeDisplay from './components/RecipeDisplay';
import Footer from './components/Footer';

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
          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <Hero onScrollToSearch={() => {
                  document.getElementById('recipe-form')?.scrollIntoView({ behavior: 'smooth' });
                }} />
                <HowItWorks />
                <div className="container mx-auto px-4 py-12" id="recipe-form">
                  <SmartSearch onSelectRecipe={handleRecipeSelect} />
                </div>
                {selectedRecipe && (
                  <div ref={resultRef} className="container mx-auto px-4 pb-16">
                    <RecipeDisplay recipe={selectedRecipe} />
                  </div>
                )}
              </>
            }
          />

          {/* All preset recipes */}
          <Route path="/recipes" element={<Recipes />} />

          {/* Detail view */}
          <Route path="/recipes/:name" element={<RecipeDetail />} />

          {/* User-saved */}
          <Route path="/saved-recipes" element={<SavedRecipes />} />

          {/* About & others */}
          <Route path="/about" element={<About />} />
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
