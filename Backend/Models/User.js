const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  allergies: [String],
  dietaryPreferences: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
