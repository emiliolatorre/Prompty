const promptService = require('../services/prompts.services');
const { validationResult } = require("express-validator");

const createPromptController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { category, desc, prompts } = req.body;
    if (category && desc && prompts !== undefined) {
        try {
            const response = await promptService.createPrompt(category, desc, prompts);
            res.status(201).json({
                "items_created": response
            });
        } catch (error) {
            console.log('Error in createPromptController:', error);
            res.status(500).json({ mensaje: error.message });
        }
    } else {
        res.status(400).json({ error: "Missing fields" });
    }
};
// Prueba Postman (PENDING)
// POST http://localhost:3000/api/prompts
// {
//     category: 'Provide Contextual Details',
//     desc: 'Include information like background info, specific facts, or user preferences to the AI understand the specific scenario or context in order to provide more accurate responses.',
//     prompts: [
//         {
//             id: 1,
//             title: "Craft a sales pitch",
//             question: "Craft a compelling sales pitch for a new health and wellnewss product targeted at busy professionals."
//         },
//         {
//             id: 2,
//             title: "Feedback Email",
//             question: "Write a professional email to a colleague requesting feedback on a draft report on our platform’s current traffic."
//         },
//         {
//             id: 3,
//             title: "Expresso machine description",
//             question: "Expresso machine description', question: 'Write a product description for a high-end espresso machine with the newest features and targeted to both novice and experienced coffee enthusiasts."
//         }
//     ]
// }

// READ all mongodb
// const readPromptsController = async (req, res) => {
//     let prompts;
//     try {
//         prompts = await promptService.readPrompts();
//         res.status(200).json(prompts); // [] with the found prompts
//     } catch (error) {
//         console.log('Error in readPromptsController:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// Prueba Postman (PENDING)

// READ BY CATEGORY
const readPromptsController = async (req, res) => {
    let prompts;
    try {
        const category = req.query.category || null;
        prompts = await promptService.readPrompts(category);
        res.status(200).json(prompts); // [] with the found prompts
    } catch (error) {
        console.log('Error in readPromptsByCategoryController:', error);
        res.status(500).json({ error: error.message });
    }
};
// Prueba Postman (PENDING)
// GET http://localhost:3000/api/prompts
// GET http://localhost:3000/api/prompts?category=Provide Contextual Details

// READ BY KEYWORD
const readPromptsByKeywordController = async (req, res) => {
    let prompts;
    try {
        const keyword = req.query.keyword || null;
        prompts = await promptService.readPromptsByKeyword(keyword);
        res.status(200).json(prompts); // [] with the found prompts
    } catch (error) {
        console.log('Error in readPromptsByKeywordController:', error);
        res.status(500).json({ error: error.message });
    }
};
// Prueba Postman (PENDING)
// GET http://localhost:3000/api/prompts/keyword?keyword=Sales

const updatePromptController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const filter = { category: req.query.category };
    const update = req.body;
    try {
        const modifiedPrompt = await promptService.updatePrompt(filter, update);
        res.status(200).json(modifiedPrompt);
    } catch (error) {
        console.log('Error in updatePromptController:', error);
        res.status(500).json({ error: error.message });
    }
};
// Prueba Postman (PENDING)
// PUT http://localhost:3000/api/prompts?category=Provide Contextual Details
//{
//     category: 'Provide Contextual Detail - TEST UPDATE',
//     desc: 'Include information like background info, specific facts, or user preferences to the AI understand the specific scenario or context in order to provide more accurate responses.',
//     prompts: [
//         {
//             id: 1,
//             title: "Craft a sales pitch",
//             question: "Craft a compelling sales pitch for a new health and wellnewss product targeted at busy professionals."
//         },
//         {
//             id: 2,
//             title: "Feedback Email",
//             question: "Write a professional email to a colleague requesting feedback on a draft report on our platform’s current traffic."
//         },
//         {
//             id: 3,
//             title: "Expresso machine description",
//             question: "Expresso machine description', question: 'Write a product description for a high-end espresso machine with the newest features and targeted to both novice and experienced coffee enthusiasts."
//         }
//     ]
// }

const deletePromptController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let prompts;
    try {
        prompts = await promptService.deletePrompt(req.query.category);
        res.status(200).json(prompts); // [] with the deleted prompt
    } catch (error) {
        console.log('Error in deletePromptController:', error);
        res.status(500).json({ error: "Error from database" });
    }
};
// Prueba Postman
// DELETE http://localhost:3000/api/prompts?category=Provide Contextual Detail - TEST UPDATE

module.exports = {
    createPromptController,
    readPromptsController,
    readPromptsByKeywordController,
    updatePromptController,
    deletePromptController
}