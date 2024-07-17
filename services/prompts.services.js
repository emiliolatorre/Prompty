const Prompt = require('../models/prompts.models');
const mongoose = require("mongoose");

// CREATE
const createPrompt = async (category, desc, prompts) => {
    try {
        // Search the existing prompts per category, desc and prompts
        const existingPrompt = await Prompt.findOne({ category, desc, prompts });
        if (existingPrompt) {
            // If it already exists in mongodb, update the existing chat
            existingPrompt.category = category;
            existingPrompt.desc = desc;
            existingPrompt.prompts = prompts;
            return await existingPrompt.save();
        } else {
            // If it doesn't exist in mongodb, create a new one
            const newPrompt = new Prompt({
                category,
                desc,
                prompts
            });

            const result = await newPrompt.save();
            console.log(result);
            return result;
        }
    } catch (error) {
        console.log('Error creating prompt:', error);
    }
};

//Testing (TEST PASSED)
// createPrompt('Provide Contextual Detail - TEST CREATE',
// 'Include information like background info, specific facts, or user preferences to the AI understand the specific scenario or context in order to provide more accurate responses.',
// [
//         {
//             id: 1,
//             title: "Craft a sales pitch",
//             question: "Craft a compelling sales pitch for a new health and wellnewss product targeted at busy professionals."
//           },
//           {
//             id: 2,
//             title: "Feedback Email",
//             question: "Write a professional email to a colleague requesting feedback on a draft report on our platform’s current traffic."
//           },
//           {
//             id: 3,
//             title: "Expresso machine description",
//             question: "Expresso machine description', question: 'Write a product description for a high-end espresso machine with the newest features and targeted to both novice and experienced coffee enthusiasts."
//           }
//         ]);


// READ ALL
// const readPrompts = async () => {
//     try {
//         const prompts = await Prompt
//             .find()
//             .select('category desc prompts')
//         console.log(prompts);
//         return prompts;
//     } catch (error) {
//         console.log('Error listing prompts:', error);
//     }
// };

// READ By CATEGORY
const readPrompts = async (category) => {
    try {
        let filter = {};

        if (category) {
            filter = {
                category: { $regex: category, $options: 'i' }
            };
        }

        const prompts = await Prompt.find(filter)
            .select('category desc prompts _id')
        console.log(prompts)

        return prompts;
    } catch (error) {
        console.log('Error searching prompts by category:', error);
    }
};

// Testing (TEST PASSED)
// readPrompts()
// readPrompts('Provide Contextual Detail - TEST CREATE');

//READ BY KEYWORD
const readPromptsByKeyword = async (keyword) => {
    try {
        let matchStage = {};

        if (keyword) {
            matchStage = {
                "prompts.question": { $regex: keyword, $options: 'i' }
            };
        }

        const results = await Prompt.aggregate([
            { $unwind: "$prompts" },
            { $match: matchStage },
            { $group: {
                _id: { category: "$category", desc: "$desc" },
                prompts: { $push: { id: "$prompts.id", title: "$prompts.title", question: "$prompts.question" } }
            }},
            { $project: {
                _id: 0,
                category: "$_id.category",
                desc: "$_id.desc",
                prompts: 1
            }},
            { $limit: 10 }
        ]);

        console.log(results);
        return results;
    } catch (error) {
        console.log('Error listing prompts:', error);
    }
};

// Testing
// readPromptsByKeyword('Craft a compelling sales pitch')

// UPDATE
const updatePrompt = async (filter, update) => {
    try {
        const modifiedPrompt = await Prompt
            .findOneAndUpdate( filter, update, {
                new: true
            });
        console.log(modifiedPrompt);
        return modifiedPrompt;
    } catch (error) {
        console.log('Cannot update prompt, error:', error)
    }
};

// Testing (TEST PASSED); each test should be passed with an existing ObjectId
// updatePrompt('Provide Contextual Detail - TEST CREATE',
// {
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
// });

const deletePrompt = async (filter) => {
    try {
        const removedPrompt = await Prompt
            .deleteOne({ 'category': filter });
        console.log(removedPrompt);
        return removedPrompt;
    } catch (error) {
        console.log('Error deleting chat:', error);
    }
};

// Testing (TEST PASSED)
// deletePrompt('Provide Contextual Detail - TEST UPDATE');

module.exports = {
    createPrompt,
    readPrompts,
    readPromptsByKeyword,
    updatePrompt,
    deletePrompt
};