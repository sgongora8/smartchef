
const API_KEY = process.env.USDA_API_KEY;

exports.fetchNutritionForIngredients = async (ingredients) => {
  const results = [];

  for (const item of ingredients) {
    const res = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(item)}&api_key=${API_KEY}`
    );

    const data = await res.json();
    if (data.foods && data.foods.length > 0) {
      results.push({
        ingredient: item,
        foodName: data.foods[0].description,
        calories: data.foods[0].foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0,
        fat: data.foods[0].foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0,
        protein: data.foods[0].foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0
      });
    }
  }

  return results;
};
