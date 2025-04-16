

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON in the request body
app.use(express.json());

// Import routes
const recipeRoutes = require("./routes/recipes");

// Mount routes
app.use("/recipes", recipeRoutes);

// Root route (welcome message)
app.get("/", (req, res) => {
  res.send("Welcome to SmartChef! Ready to get cooking?");
});

// Start the server
app.listen(PORT, () => {
  console.log(`SmartChef is running at http://localhost:${PORT}`);
});
