const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const cors = require("cors");
const path = require('path');
const connectDB = require('./config/db');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});

app.use(cors());
app.use(express.json())
// Connect to database
connectDB();

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

console.log(process.env);
module.exports = app;

