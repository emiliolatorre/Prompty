const Chat = require('../models/chats.models');
const mongoose = require("mongoose");

// CREATE (TEST NOT PASSED)
const createChat = async (title, chat) => {
    try {
        // Search the existing chat per title and chat
        const existingChat = await Chat.findOne({ title, chat });
        if (existingChat) {
            // If it already exists in mongodb, update the existing chat
            existingChat.title = title;
            existingChat.chat = chat;
            return await existingChat.save();
        } else {
            // If it doesn't exist in mongodb, create a new one
            const newChat = new Chat({
                title,
                chat
            });

            const result = await newChat.save();
            console.log(result);
            return result;
        }
    } catch (error) {
        console.log('Error creating chat:', error);
    }
};

//Testing (TEST PASSED)
// createChat('Digital Marketing Strategies - test', [
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
//         ]);

// READ ALL
// const readChats = async () => {
//     try {
//         const chats = await Chat
//             .find()
//             .select('title chat')
//         console.log(chats);
//         return chats;
//     } catch (error) {
//         console.log('Error listing chats:', error);
//     }
// };

const readChats = async (id) => {
    try {
        let filter = {};

        if (id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                filter = { _id: new mongoose.Types.ObjectId(id) };
            } else {
                throw new Error('Invalid ID format');
            }
        }

        const chats = await Chat.find(filter)
            .select('title chat _id')

        console.log(chats)
        return chats;
    } catch (error) {
        console.log('Error listing jobs:', error);
    };
};

// Testing (TEST PASSED)
// readChats();

// READ BY OBJECT_ID
// const readChatsByID = async (favoritesID) => {
//     const chatsFiltered = [];
//     console.log(favoritesID)
//     try {
//         for (const id of favoritesID) {

//             // Check if the _id is valid and convert it to an ObjectId if necessary.
//             if (!mongoose.Types.ObjectId.isValid(id)) {
//                 throw new Error('Invalid ID format');
//             }

//             // Create a filter to seach exactly by _id
//             const filter = { _id: new mongoose.Types.ObjectId(id) };
//             console.log(filter)

//             const chat = await Chat.findOne(filter)
//                 .select('title chat')
//             chatsFiltered.push(chat)
//         };
//         return chatsFiltered;
//     } catch (error) {
//         console.log('Error searching chats by ObjectId:', error);
//         return [];
//     }
// };

// Testing (TEST PASSED)
// const idtest = ['6694c2351818094fbea8ae25']
// readChatsByID(idtest)

const updateChat = async (filter, update) => {
    try {
        const modifiedChat = await Chat
            .findOneAndUpdate({ '_id': new mongoose.Types.ObjectId(filter) }, update, {
                new: true
            });
        console.log(modifiedChat);
        return modifiedChat;
    } catch (error) {
        console.log('Cannot update chat, error:', error)
    }
};

// Testing (TEST PASSED); each test should be passed with an existing ObjectId
// updateChat(('6694c2351818094fbea8ae25'),
//     {
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
//     });

const deleteChat = async (filter) => {
    try {
        const removedChat = await Chat
            .deleteOne({ '_id': new mongoose.Types.ObjectId(filter) });
        console.log(removedChat);
        return removedChat;
    } catch (error) {
        console.log('Error deleting chat:', error);
    }
};

// Testing
deleteChat('6694c2351818094fbea8ae25');

module.exports = {
    createChat,
    readChats,
    updateChat,
    deleteChat
};