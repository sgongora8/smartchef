// routes/users.js

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser,
  getUserProfile,
  addFavorite,
  getFavorites
} = require("../controllers/userController");

// POST /users/register → Register a new user
router.post("/register", registerUser);

// POST /users/login → Log in existing user
router.post("/login", loginUser);

// GET /users/:id → Get user profile
router.get("/:id", getUserProfile);

// POST /users/:id/favorites → Save a recipe to favorites
router.post("/:id/favorites", addFavorite);

// GET /users/:id/favorites → View saved favorite recipes
router.get("/:id/favorites", getFavorites);

module.exports = router;
