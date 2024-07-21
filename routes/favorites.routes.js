const favoritesController = require('../controllers/favorites.controllers');
const router = require('express').Router();
const { validateCreateFavorite, validateReadFavorites, validateDeleteFavorite } = require("../validators/favorites.validators");

// POST https://prompty-4y5d.onrender.com/api/favorites
router.post("/", validateCreateFavorite, favoritesController.createFavoriteController);
// GET https://prompty-4y5d.onrender.com/api/favorites?email=diego@gmail.com
router.get("/", validateReadFavorites, favoritesController.readFavoritesController);
// DELETE https://prompty-4y5d.onrender.com/api/favorites?email=diego@gmail.com&chat_id=66843f141fd851901525667c
router.delete("/", validateDeleteFavorite, favoritesController.deleteFavoriteController);

module.exports = router;