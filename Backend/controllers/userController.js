const User = require('../Models/User');
const Recipe = require('../Models/Recipe');

exports.toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.recipeId;

    if (user.favorites.includes(recipeId)) {
      // remove
      user.favorites.pull(recipeId);
    } else {
      // add
      user.favorites.push(recipeId);
    }

    await user.save();
    // return the populated list
    await user.populate('favorites');
    res.json(user.favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error toggling favorites' });
  }
};


exports.getFavorites = async (req, res) => {
  try {
    console.log('getFavorites for user:', req.user.email);

    const user = await User.findById(req.user._id).lean();
    if (!user) {
      console.warn('No user found for:', req.user._id);
      return res.json([]);
    }

    console.log('   raw favorite IDs:', user.favorites);

    const recipes = await Recipe.find({
      _id: { $in: user.favorites }
    }).lean();

    console.log(`   returning ${recipes.length} recipes`);
    return res.json(recipes);

  } catch (err) {
    console.error('getFavorites error:', err);
    return res.status(500).json({ error: 'Server error fetching favorites' });
  }
};



exports.savePreferences = async (req, res) => {
  try {
    const userId = req.user?._id || req.session?.passport?.user;
    if (!userId) return res.status(401).json({ message: 'Not logged in' });

    const { dietaryPreferences, allergies } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        dietaryPreferences: dietaryPreferences || [],
        allergies: allergies?.split(',').map(str => str.trim()) || []
      },
      { new: true }
    );

    res.status(200).json({ message: 'Preferences saved', user });
  } catch (err) {
    console.error('Error saving preferences:', err);
    res.status(500).json({ error: 'Failed to save preferences' });
  }
};


exports.getPreferences = async (req, res) => {
  try {
    const userId = req.user?._id || req.session?.passport?.user;
    if (!userId) return res.status(401).json({ message: 'Not logged in' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      dietaryPreferences: user.dietaryPreferences || [],
      allergies: user.allergies?.join(', ') || ''
    });
  } catch (err) {
    console.error('Error getting preferences:', err);
    res.status(500).json({ error: 'Failed to load preferences' });
  }
};
