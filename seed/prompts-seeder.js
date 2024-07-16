const mongoose = require("mongoose");
const Prompt = require("../models/prompts.models");

// IMPLEMENTAR ESTO PARA QUE CADA VEZ QUE INICIEMOS EL PROYECTO REINICIA LA DB BASICA
var newPrompts = [
    {
      category: 'Provide Contextual Detail',
      desc: 'Include information like background info, specific facts, or user preferences to the AI understand the specific scenario or context in order to provide more accurate responses.',
      prompts: [
        { id: 1, title: 'Craft a sales pitch', question: 'Craft a compelling sales pitch for a new health and wellnewss product targeted at busy professionals' },
        { id: 2, title: 'Feedback Email', question: 'Write a professional email to a colleague requesting feedback on a draft report on our plataforms current traffic.' },
        { id: 3, title: 'Expresso machine description', question: 'Write a product description for a high-end espresso machine with the newest features and targeted to both novice and experienced coffee enthusiasts.' }
      ]
    },
    {
      category: 'Feed it Content or Reference Material',
      desc: 'You can provide domain-spcecific knowledge, verified resources or specific requirements you want AI to follow, or just data later than Sept 2021!.',
      prompts: [
        { id: 4, title: 'Spotifys benefit statement', question: 'Use Spotifys brand voice to write a one-sentence benefit statement on why someone should use Spotify: Spotifys Brand: Spotify, a music streaming company, has a brand voice that is funny, direct, and concise. Rather than taking itself too seriously, Spotify plays up the humor of different playlists, music genres, and new releases.' },
        { id: 5, title: 'Remote work post', question: 'Write a blog post about the benefits of remote work, using statistics from the 2022 Remote Work Report by FlexJobs: "85% of remote workers report increased productivity, and 97% recommend remote work to others." Include personal anecdotes and practical tips for staying productive.' },
        { id: 6, title: 'Promo Email Zara', question: 'Write a marketing email promoting the summer sale at Zara, offering up to 50% off on select items. Use an enthusiastic and stylish tone. Reference key items on sale, such as designer dresses, summer accessories, and beachwear. Include a call-to-action to visit the website and shop the sale, with a special discount code "SUMMER50".' }
      ]
    },
    {
      category: 'Clearly State the Desired Topic or Task',
      desc: 'Explicitly mention the task or topic you want ChatGPT to address. This helps focus the response and avoids deviations or ambiguous outputs.',
      prompts: [
        { id: 7, title: 'Digital Marketing Strategies', question: 'Explain three effective digital marketing strategies for small businesses' },
        { id: 8, title: 'Google Ads campaigns', question: 'Provide tips for optimizing Google Ads campaigns.' },
        { id: 9, title: 'Leag Gen tactics', question: 'Discuss effective lead generation tactics for B2B companies in the tech industry.' }
      ]
    },
    {
      category: 'Set Parametres',
      desc: 'Specify constraints to guide a response within defined boundaries. How many words, characters, and sentences do you want? How many outputs do you want?',
      prompts: [
        { id: 10, title: 'SEO headline examples', question: 'Write 10 SEO headline examples in 170 characters or less for an article about “5 Tips to Get Started as a Content Marketer in 2023“.' },
        { id: 11, title: 'Marketing case studies', question: 'Please provide three recent case studies showcasing successful social media marketing campaigns in the e-commerce industry. Include specific metrics, engagement rates, and any notable strategies implemented by the brands.' },
        { id: 12, title: 'Instagram landing page', question: 'Using the AIDA framework for copywriting, write a landing page with (2) header combinations and (2) features for Instagram' }
      ]
    },
    {
      category: 'Specify Format',
      desc: 'Providing the output format in a ChatGPT response helps guide the AI model to generate the desired content type. If you have a particular format you want, like a short story or meta description, state it explicitly.',
      prompts: [
        { id: 12, title: 'Moby Dick essay', question: 'Write a 500-word 5 paragraph essay on Moby Dick' },
        { id: 14, title: 'Pros and cons master', question: 'List pros and cons for getting a masters degree in marketing using bullet points with only one sentence per bullet.' },
        { id: 15, title: 'Vegan Lasagna recipe', question: 'Write a recipe for a vegan lasagna, including a list of ingredients and step-by-step instructions including the time of each step.' }
      ]
    },
    {
      category: 'Prompt Examples for Developers',
      desc: 'Get relevant information both for learning and to solve technical doubt along your dev career',
      prompts: [
        { id: 16, title: 'Mobile App courses', question: 'List 10 potential topics for beginners for a mobile app development course and list for each topic a top 3 courses in bullets.' },
        { id: 17, title: 'Testing flowchart', question: 'Develop a flowchart for a software testing process on a large-scale project.' },
        { id: 18, title: 'Authentication methods', question: 'Suggest 5 ways to handle user authentication in a web application for improved security.' }
      ]
    }
  ];


const seedDB = async () =>{
    await Prompt.deleteMany();
    await Prompt.insertMany(newPrompts);
};

seedDB().then(()=>{
    mongoose.connection.close();
})