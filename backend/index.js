
const express = require("express");
const app = express();
const PORT = 3000;
// Middleware
app.use(express.json());
// Import routes
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users"); // ✅ NEW
// Mount routes
app.use("/recipes", recipeRoutes);
app.use("/users", userRoutes); // ✅ NEW
// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to SmartChef! Ready to get cooking?");
});
// Start server
app.listen(PORT, () => {
  console.log(`SmartChef is running at http://localhost:${PORT}`);
});
