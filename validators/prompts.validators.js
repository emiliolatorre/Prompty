const { body, param, query } = require("express-validator");

const validateCreatePrompt = [
    body("category")
        .exists().withMessage("Category of prompt is required")
        .isString().withMessage("Category should be a string"),
    body("desc")
        .exists().withMessage("Desc of prompt is required")
        .isString().withMessage("Desc should be a string"),
    body("prompts")
        .exists().withMessage("Prompts is required")
        .isArray().withMessage("Prompts should be a array")
];

const validateUpdatePrompt = [
    query("category")
        .exists().withMessage("Category should exist to update a prompt")
        .isString().withMessage("Category should be a string"),
    body("category")
        .optional()
        .isString().withMessage("Category should be a string"),
    body("desc")
        .optional()
        .isString().withMessage("Desc should be a string"),
    body("prompts")
        .optional()
        .isArray().withMessage("Prompts should be a array")
];

const validateDeletePrompt = [
    query("category").notEmpty().withMessage("Category should exist to delete a prompt")
];

module.exports = {
    validateCreatePrompt,
    validateUpdatePrompt,
    validateDeletePrompt
};