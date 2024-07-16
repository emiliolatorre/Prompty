const chatsController = require('../controllers/chats.controllers');
const router = require('express').Router();
const { validateCreateChat, validateUpdateChat, validateDeleteChat } = require("../validators/chats.validators");

// POST http://localhost:3000/api/chats
router.post('/', validateCreateChat, chatsController.createChatController);
// GET http://localhost:3000/api/chats --> All Chats
router.get('/', chatsController.readChatsController);
// PUT http://localhost:3000/api/chats?id='XXX'
router.put('/', validateUpdateChat, chatsController.updateChatController);
// DELETE http://localhost:3000/api/chats?id='XXX'
router.delete('/', validateDeleteChat, chatsController.deleteChatController);

module.exports = router;