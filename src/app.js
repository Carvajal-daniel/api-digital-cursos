const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
