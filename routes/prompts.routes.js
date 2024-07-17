const promptsController = require('../controllers/prompts.controllers');
const router = require('express').Router();
const { validateCreatePrompt, validateUpdatePrompt, validateDeletePrompt } = require("../validators/prompts.validators");

// POST http://localhost:3000/api/prompts
router.post('/', validateCreatePrompt, promptsController.createPromptController);
// GET http://localhost:3000/api/prompts --> All Prompts
router.get('/', promptsController.readPromptsController);
// GET http://localhost:3000/api/prompts/keyword?keyword=Sales --> All Prompts
router.get('/keyword', promptsController.readPromptsByKeywordController);
// PUT http://localhost:3000/api/prompts?category='Twitter embed from website shared to twitter'
router.put('/', validateUpdatePrompt, promptsController.updatePromptController);
// DELETE http://localhost:3000/api/prompts?category='Twitter embed from website shared to twitter'
router.delete('/', validateDeletePrompt, promptsController.deletePromptController);

module.exports = router;