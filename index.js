const express = require('express');
const app = express();
const livrosRoutes = require('./Routes/livros');

// Habilita o middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Usando a rota de livros
app.use('/api/livros', livrosRoutes);

// Definir a porta
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
