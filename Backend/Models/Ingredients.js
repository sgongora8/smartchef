const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  dietaryTags: [String],
  nutrition: {
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number,
  }
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);
