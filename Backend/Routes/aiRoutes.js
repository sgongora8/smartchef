const express      = require('express');
const router       = express.Router();
const aiController = require('../controllers/aiController');

router.post('/smart-search',    aiController.smartRecipeSearch);

router.post('/recipe-nutrition', aiController.getRecipeNutritionAnswer);

router.post('/nutrition',        aiController.getRecipeNutritionAnswer);

module.exports = router;
