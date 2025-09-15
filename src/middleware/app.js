const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Permite requisições do frontend
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

module.exports = app;
