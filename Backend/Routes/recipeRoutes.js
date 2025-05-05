// backend/Routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Serve all preset recipes from JSON
const recipes = require('../data/recipes.json');
router.get('/', (req, res) => {
  res.json(recipes);
});

// Existing search endpoint
router.get('/search', recipeController.searchRecipes);

module.exports = router;
