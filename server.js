// index.js
const express = require('express');
const app = express();

// Habilita o middleware para parsing de JSON
app.use(express.json());

// Certifique-se de que o caminho para a pasta 'routes' está correto
const livrosRoutes = require('./Routes/livros'); // Use 'routes' com 'r' minúsculo

// Rota de livros
app.use('/api/livros', livrosRoutes);

// Define a porta
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
