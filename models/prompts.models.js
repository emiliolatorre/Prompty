const mongoose = require('mongoose');
require('../utils/config/db_mongo') // Connection to MongoDB

const objectSchema = {
    category: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    prompts: {
        type: Array,
        required: true
    }
    // date:{
    //     type: new Date("<YYYY-mm-dd>")
    // },
};

// Crear el esquema
const promptSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;

// Create a Prompt (TEST PASSED)
// const p = new Prompt ({
//     category: "Provide Contextual Detail",
//     desc: "Include information like background info, specific facts, or user preferences to the AI understand the specific scenario or context in order to provide more accurate responses.",
//     prompts: [
//     {
//         id: 1,
//         title: "Craft a sales pitch",
//         question: "Craft a compelling sales pitch for a new health and wellnewss product targeted at busy professionals."
//       },
//       {
//         id: 2,
//         title: "Feedback Email",
//         question: "Write a professional email to a colleague requesting feedback on a draft report on our platform’s current traffic."
//       },
//       {
//         id: 3,
//         title: "Expresso machine description",
//         question: "Expresso machine description', question: 'Write a product description for a high-end espresso machine with the newest features and targeted to both novice and experienced coffee enthusiasts."
//       }
//     ]
// });

// p.save()
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))

// Find all Prompts (TEST PASSED)
// Prompt.find({}).then(data=>console.log(data));