const express = require('express');
const router = express.Router();
const { getNutritionInfo } = require('../controllers/nutritionController');

router.get('/:ingredient', getNutritionInfo);

module.exports = router;
