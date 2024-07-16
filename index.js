const express = require("express");
const morgan = require('./middlewares/morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const app = express(); // Initialize server
const port = 3000;
// const port = process.env.PORT;

// Documentación API
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Middlewares
app.use(morgan(':method :url :status - :response-time ms :body'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json()); // Enable JSON reception on server
app.use(express.static(path.join(__dirname, 'client/build'))); // Serve the static files from the React app

// Routes
// const webRoutes = require("./routes/web.routes"); // no hacen falta, van por React
const promptsRoutes = require("./routes/prompts.routes");
const chatsRoutes = require("./routes/chats.routes");
const usersRoutes = require("./routes/users.routes");
const favoritesRoutes = require("./routes/favorites.routes");
app.use(cors());

// API Routes
// app.use('/', webRoutes); // no hacen falta, van por React
app.use('/api/prompts', promptsRoutes);
app.use('/api/chats', chatsRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/favorites', favoritesRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const server = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = server;