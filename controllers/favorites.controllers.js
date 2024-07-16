const favorite = require('../models/favorites.models');
const { validationResult } = require("express-validator");

const createFavoriteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newFavorite = req.body;
    if (
        "email" in newFavorite &&
        "chat_id" in newFavorite
    ) {
        try {
            const response = await favorite.createFavorite(newFavorite);
            res.status(201).json({
                items_created: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
}
// Prueba Postman
// POST http://localhost:3000/api/favorites
// {
//     "email": "emilio@gmail.com",
//     "chat_id": "6694c2717971c4ede75ccfc4"
// }

const readFavoritesController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let favorites;
    try {
        favorites = await favorite.readFavorites(req.query.email);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Prueba Postman
// GET http://localhost:3000/api/favorites?email=emilio@gmail.com

const deleteFavoriteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let favorites;
    try {
        favorites = await favorite.deleteFavorite(req.query.email, req.query.chat_id);
        res.status(200).json(favorites); // [] con las users encontradas
    } catch (error) {
        res.status(500).json({ error: 'Error en la BBDD' });
    }
}
// Prueba Postman
// DELETE http://localhost:3000/api/favorites?email=emilio@gmail.com&chat_id=6694c2717971c4ede75ccfc4

module.exports = {
    createFavoriteController,
    readFavoritesController,
    deleteFavoriteController
}