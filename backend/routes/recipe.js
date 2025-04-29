

const express = require("express");
const router = express.Router();

// import controller functions
const {
  getAllRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe
} = require("../controllers/recipeController");

// GET /recipes - get all recipes
router.get("/", getAllRecipes);

// POST /recipes - add a new recipe
router.post("/", addRecipe);

// PUT /recipes/:id - update a recipe
router.put("/:id", updateRecipe);

// DELETE /recipes/:id - delete a recipe
router.delete("/:id", deleteRecipe);

module.exports = router;
