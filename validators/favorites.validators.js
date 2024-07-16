const { body, param, query } = require("express-validator");

const validateCreateFavorite = [
    body("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Email format wrong"),
    body("chat_id")
        .exists().withMessage("Chat_id is required")
        .isString().withMessage("Chat_id should be string")
];

const validateReadFavorites = [
    query("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Email format wrong")
]

const validateDeleteFavorite = [
    query("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Email format wrong"),
    query("chat_id")
        .exists().withMessage("Chat_id is required")
        .isString().withMessage("Chat_id should be string")
];

module.exports = {
    validateCreateFavorite,
    validateReadFavorites,
    validateDeleteFavorite
};