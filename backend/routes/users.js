
const express = require("express");
const router = express.Router();

// import controller functions
const {
  registerUser,
  loginUser,
  getUserProfile,
  addFavorite,
  getFavorites
} = require("../controllers/userController");

// POST /users/register - register a new user
router.post("/register", registerUser);

// POST /users/login - log in existing user
router.post("/login", loginUser);

// GET /users/:id - get user profile
router.get("/:id", getUserProfile);

// POST /users/:id/favorites - save a recipe to favorites
router.post("/:id/favorites", addFavorite);

// GET /users/:id/favorites - view saved favorite recipes
router.get("/:id/favorites", getFavorites);

module.exports = router;
