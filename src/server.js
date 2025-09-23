require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});
