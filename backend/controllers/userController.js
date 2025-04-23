// controllers/userController.js

let users = [
  { id: 1, email: "test@example.com", password: "123456", favorites: [1, 2] }
];

// Register a new user
const registerUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    favorites: []
  };

  users.push(newUser);
  res.status(201).json({ message: "User registered!", user: newUser });
};

// Log in a user
const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful!", user });
};

// Get user profile
const getUserProfile = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(200).json({
    email: user.email,
    favorites: user.favorites
  });
};

// Add a recipe to user's favorites
const addFavorite = (req, res) => {
  const userId = parseInt(req.params.id);
  const { recipeId } = req.body;

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (!recipeId || typeof recipeId !== "number") {
    return res.status(400).json({ message: "Valid recipeId required." });
  }

  if (user.favorites.includes(recipeId)) {
    return res.status(400).json({ message: "Recipe already in favorites." });
  }

  user.favorites.push(recipeId);
  res.status(200).json({ message: "Recipe added to favorites!", favorites: user.favorites });
};

// Get user's favorite recipes (IDs only for now)
const getFavorites = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(200).json({ favorites: user.favorites });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  addFavorite,
  getFavorites
};

