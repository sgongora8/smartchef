const express = require('express');
const router = express.Router();

const ensureAuth = require('../middleware/ensureAuth');
const userController = require('../controllers/userController');



router.get(
  '/favorites',
  ensureAuth,
  userController.getFavorites
);


router.post(
  '/favorites/:recipeId',
  ensureAuth,
  userController.toggleFavorite
);


router.post(
  '/save-preferences',
  ensureAuth,                    
  userController.savePreferences
);


router.get(
  '/preferences',
  ensureAuth,
  userController.getPreferences
);


router.post('/debug', (req, res) => {
  console.log(' /debug body:', req.body);
  console.log(' req.user:', req.user);
  res.json({ body: req.body, user: req.user });
});

module.exports = router;
