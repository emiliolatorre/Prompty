const promptsController = require('../controllers/prompts.controllers');
const router = require('express').Router();
const { validateCreatePrompt, validateUpdatePrompt, validateDeletePrompt } = require("../validators/prompts.validators");

// POST https://prompty-4y5d.onrender.com/api/prompts
router.post('/', validateCreatePrompt, promptsController.createPromptController);
// GET https://prompty-4y5d.onrender.com/api/prompts --> All Prompts
router.get('/', promptsController.readPromptsController);
// GET https://prompty-4y5d.onrender.com/api/prompts/keyword?keyword=Sales --> All Prompts
router.get('/keyword', promptsController.readPromptsByKeywordController);
// PUT https://prompty-4y5d.onrender.com/api/prompts?category='Twitter embed from website shared to twitter'
router.put('/', validateUpdatePrompt, promptsController.updatePromptController);
// DELETE https://prompty-4y5d.onrender.com/api/prompts?category='Twitter embed from website shared to twitter'
router.delete('/', validateDeletePrompt, promptsController.deletePromptController);

module.exports = router;