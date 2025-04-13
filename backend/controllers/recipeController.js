// controllers/recipeController.js

// Temporary in-memory data
let recipes = [
  { id: 1, title: "Omelette", ingredients: ["Eggs", "Cheese", "Onions"] },
  { id: 2, title: "French Toast", ingredients: ["Eggs", "Bread", "Milk"] }
];

// @desc Get all recipes
const getAllRecipes = (req, res) => {
  res.json(recipes);
};

// @desc Add a new recipe
const addRecipe = (req, res) => {
  const newRecipe = req.body;

  if (!newRecipe.title || !newRecipe.ingredients) {
    return res.status(400).json({ message: "Title and ingredients are required." });
  }

  newRecipe.id = recipes.length + 1;
  recipes.push(newRecipe);

  res.status(201).json({ message: "Recipe added successfully!", data: newRecipe });
};

// @desc Update a recipe
const updateRecipe = (req, res) => {
  const recipeId = parseInt(req.params.id);
  const updatedData = req.body;

  const index = recipes.findIndex(r => r.id === recipeId);
  if (index === -1) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  recipes[index].title = updatedData.title || recipes[index].title;
  recipes[index].ingredients = updatedData.ingredients || recipes[index].ingredients;

  res.json({ message: "Recipe updated", data: recipes[index] });
};

// @desc Delete a recipe
const deleteRecipe = (req, res) => {
  const recipeId = parseInt(req.params.id);
  const index = recipes.findIndex(r => r.id === recipeId);

  if (index === -1) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const deleted = recipes.splice(index, 1);
  res.json({ message: "Recipe deleted", deleted: deleted[0] });
};

module.exports = {
  getAllRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe
};
