
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users"); // ✅ NEW
app.use("/recipes", recipeRoutes);
app.use("/users", userRoutes); // ✅ NEW
app.get("/", (req, res) => {
  res.send("Welcome to SmartChef! Ready to get cooking?");
});
app.listen(PORT, () => {
  console.log(`SmartChef is running at http://localhost:${PORT}`);
});
