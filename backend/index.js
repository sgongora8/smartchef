const express = require("express");
const app = express();
const PORT = 3000;

// This line helps us read JSON sent by the user:
app.use(express.json());

// We'll keep our recipes in a simple list (in-memory for now)
let recipes = [
    { id: 1, title: "Omelette", ingredients: ["Eggs", "Cheese", "Onions"] },
    { id: 2, title: "French Toast", ingredients: ["Eggs", "Bread", "Milk"] }
  ];
  


app.get("/recipes", (req, res) => {
  res.json(recipes); 
});

/**
 * 2. POST /recipes
 *    When someone sends new recipe data, we add it to our list.
 */
app.post("/recipes", (req, res) => {
  // The new recipe info is in req.body (like { "title": "Pizza", "ingredients": ["Cheese", "Dough"] })
  const newRecipe = req.body;
  // We push the new recipe into our "recipes" list
  recipes.push(newRecipe);
  res.status(201).json({ message: "Recipe added successfully!", data: newRecipe });
});

// Just a welcome message at the root URL
app.get("/", (req, res) => {
  res.send("Welcome to SmartChef! Ready to get cooking?");
});

app.listen(PORT, () => {
  console.log(`SmartChef is running on http://localhost:${PORT}`);
});

app.put("/recipes/:id", (req, res) => {
    const recipeId = parseInt(req.params.id, 10);  // from the URL
    const updatedData = req.body;                 // from the request body
  
    // Find the recipe with matching id
    const recipeIndex = recipes.findIndex(r => r.id === recipeId);
  
    if (recipeIndex === -1) {
      // If no recipe found with that ID, respond with 404
      return res.status(404).json({ message: "Recipe not found" });
    }
  
    // Overwrite the recipe's fields with the new data
    // For simplicity, assume we only update 'title' and 'ingredients'
    recipes[recipeIndex].title = updatedData.title || recipes[recipeIndex].title;
    recipes[recipeIndex].ingredients = updatedData.ingredients || recipes[recipeIndex].ingredients;
  
    res.json({
      message: "Recipe updated successfully!",
      data: recipes[recipeIndex]
    });
  });
  
  app.delete("/recipes/:id", (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipeIndex = recipes.findIndex(r => r.id === recipeId);
  
    if (recipeIndex === -1) {
      return res.status(404).json({ message: "Recipe not found" });
    }
  
    // Remove the recipe from the array
    const deletedRecipe = recipes.splice(recipeIndex, 1);
  
    res.json({
      message: "Recipe deleted!",
      deleted: deletedRecipe[0]
    });
  });
  