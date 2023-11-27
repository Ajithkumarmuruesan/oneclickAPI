const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const express = require('express');
const app = express();

db()


app.use(express.json());
app.use('/auth', authRoutes);

module.exports = app;