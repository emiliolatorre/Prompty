const chatService = require('../services/chats.services');
const { validationResult } = require("express-validator");

const createChatController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, chat } = req.body;
    if (title && chat !== undefined) {
        try {
            const response = await chatService.createChat(title, chat);
            res.status(201).json({
                "items_created": response
            });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    } else {
        res.status(400).json({ error: "Missing fields" });
    }
};
// Prueba Postman (PENDING)
// POST http://localhost:3000/api/chats
// {
//     "title": "Title test postman",
//     "chat": [
//         {
//             user: "Primer prompt, el de la card",
//             assistant: "Respuesta primer prompt"
//           },
//           {
//             user: "Segundo prompt",
//             assistant: "Respuesta segundo prompt"
//           },
//           {
//             user: "Tercer prompt, el de la card",
//             assistant: "Respuesta tercer prompt"
//           }
//         ]
// }

// READ all mongodb
// const readChatsController = async (req, res) => {
//     let chats;
//     try {
//         chats = await chatService.readChats();
//         res.status(200).json(chats); // [] with the found chats
//     } catch (error) {
//         console.log('Error in readChatsController:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// READ all or by id
const readChatsController = async (req, res) => {
    let chats;
    try {
        const id = req.query.id || null;
        chats = await chatService.readChats(id);
        res.status(200).json(chats); // [] with the found chats
    } catch (error) {
        console.log('Error in readChatsByIdController:', error);
        res.status(500).json({ error: error.message });
    }
};
// Prueba Postman (PENDING)
// GET http://localhost:3000/api/chats?id'XXX'

const updateChatController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    filter = req.query;
    update = req.body;
    try {
        const modifiedChat = await chatService.updateChat(filter, update);
        res.status(200).json(modifiedChat);
    } catch (error) {
        console.log('Error in updateChatController:', error);
        res.status(500).json({ error: error.message });
    }
};
// Prueba Postman (PENDING)
// PUT http://localhost:3000/api/chats?id=6694c2351818094fbea8ae25
// {
//         title: "Digital Marketing Strategies - TEST MARINA",
//         chat: [
//             {
//                 user: "promt testing 1",
//                 assistant: "Respuesta primer prompt testing"
//               },
//               {
//                 user: "promt testing 2",
//                 assistant: "Respuesta segundo prompt testing"
//               },
//               {
//                 user: "promt testing 3",
//                 assistant: "Respuesta tercer prompt testing"
//               }
//             ]
//     }

const deleteChatController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let chats;
    try {
        chats = await chatService.deleteChat(req.query.id);
        res.status(200).json(chats); // [] con el chat borrado
    } catch (error) {
        console.log('Error in deleteChatController:', error);
        res.status(500).json({ error: "Error from database" });
    }
};
// Prueba Postman
// DELETE http://localhost:3000/api/chats?id=6694c2351818094fbea8ae25

module.exports = {
    createChatController,
    readChatsController,
    updateChatController,
    deleteChatController
}