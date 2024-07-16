const { body, param, query } = require("express-validator");

const validateCreateChat = [
    body("title")
        .exists().withMessage("Title of chat is required")
        .isString().withMessage("Title should be a string"),
    body("chat")
        .exists().withMessage("Chat is required")
        .isArray().withMessage("Chat should be a array")
];

const validateUpdateChat = [
    query("id")
        .exists().withMessage("Id should exist to update a chat")
        .isString().withMessage("Id should be a string"),
    body("title")
        .optional()
        .isString().withMessage("Title should be a string"),
    body("chat")
        .optional()
        .isArray().withMessage("Chat should be a array")
];

const validateDeleteChat = [
    query("id").notEmpty().withMessage("Id should exist to delete a chat")
];

module.exports = {
    validateCreateChat,
    validateUpdateChat,
    validateDeleteChat
};