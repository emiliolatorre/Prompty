const chatsController = require('../controllers/chats.controllers');
const router = require('express').Router();
const { validateCreateChat, validateUpdateChat, validateDeleteChat } = require("../validators/chats.validators");

// POST https://prompty-4y5d.onrender.com/api/chats
router.post('/', validateCreateChat, chatsController.createChatController);
// GET https://prompty-4y5d.onrender.com/api/chats --> All Chats
router.get('/', chatsController.readChatsController);
// PUT https://prompty-4y5d.onrender.com/api/chats?id='XXX'
router.put('/', validateUpdateChat, chatsController.updateChatController);
// DELETE https://prompty-4y5d.onrender.com/api/chats?id='XXX'
router.delete('/', validateDeleteChat, chatsController.deleteChatController);

module.exports = router;