const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name:          { type: String, required: true },
  description:   { type: String },
  cookingTime:   { type: Number },
  cuisineType:   { type: String },
  dietaryInfo:   [{ type: String }],
  skillLevel:    { type: String },
  ingredients:   [{ type: String }],
  instructions:  [{ type: String }],
  imageUrl:      { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
