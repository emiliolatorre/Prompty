const express = require("express");
const morgan = require('./middlewares/morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const app = express(); // Initialize server

// Documentación API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Middlewares
app.use(morgan(':method :url :status - :response-time ms :body'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json()); // Enable JSON reception on server

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


//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Example app listening on http://localhost:${PORT}`);
});

module.exports = server;