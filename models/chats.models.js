const mongoose = require('mongoose');
require('../utils/config/db_mongo') // Connection to MongoDB

const objectSchema = {
    title: {
        type: String,
        required: true,
    },
    chat: {
        type: Array,
        required: true
    }
    // date:{
    //     type: new Date("<YYYY-mm-dd>")
    // },
};

// Crear el esquema
const chatSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

// Create a Chat (TEST PASSED)
// const c = new Chat({
//     title: "Digital Marketing Strategies",
//     chat: [
//     {
//         user: "Primer prompt, el de la card",
//         assistant: "Respuesta primer prompt"
//       },
//       {
//         user: "Segundo prompt",
//         assistant: "Respuesta segundo prompt"
//       },
//       {
//         user: "Tercer prompt, el de la card",
//         assistant: "Respuesta tercer prompt"
//       }
//     ]
// });

// c.save()
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))

// Find all Chats (TEST PASSED)
// Chat.find({}).then(data=>console.log(data));