const axios = require('axios');

exports.getNutritionInfo = async (req, res) => {
  const ingredient = req.params.ingredient;
  const apiKey = process.env.USDA_API_KEY;

  try {
    //search for matching foods
    const searchUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&api_key=${apiKey}`;
    const searchResponse = await axios.get(searchUrl);

    const foodItem = searchResponse.data.foods?.find(f => f.dataType === 'Branded' || f.dataType === 'Survey (FNDDS)' || f.labelNutrients);

    if (!foodItem) {
      return res.status(404).json({ error: 'Ingredient not found in USDA database' });
    }

    //get detailed nutrition info by ID
    const fdcId = foodItem.fdcId;
    const detailUrl = `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`;
    const detailResponse = await axios.get(detailUrl);

    const { description, labelNutrients } = detailResponse.data;

    if (!labelNutrients) {
      return res.status(404).json({ error: 'No nutrient data found for this item' });
    }

    res.json({ description, labelNutrients });

  } catch (err) {
    console.error('USDA API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch nutrition info from USDA API' });
  }
};
