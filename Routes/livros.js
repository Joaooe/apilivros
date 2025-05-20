// routes/livros.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const livrosFilePath = path.join(__dirname, '../data/livros.json');

// Função para ler o arquivo de livros
const readLivros = () => {
  const livrosData = fs.readFileSync(livrosFilePath);
  return JSON.parse(livrosData);
};

// 🔹 Rota GET /livros
router.get('/', (req, res) => {
  const livros = readLivros();
  res.status(200).json(livros);
});

// 🔹 Rota POST /livros
router.post('/', (req, res) => {
  const { titulo, autor, editora, ano } = req.body;

  if (!titulo || !autor || !editora || !ano) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
  }

  const livros = readLivros();
  const newId = (livros.length > 0) ? parseInt(livros[livros.length - 1].id) + 1 : 1;

  const newLivro = {
    id: newId.toString(),
    titulo,
    autor,
    editora,
    ano
  };

  livros.push(newLivro);

  fs.writeFileSync(livrosFilePath, JSON.stringify(livros, null, 2));

  res.status(201).json(newLivro);
});

// 🔹 Rota DELETE /livros/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const livros = readLivros();

  const index = livros.findIndex(livro => livro.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  livros.splice(index, 1);

  fs.writeFileSync(livrosFilePath, JSON.stringify(livros, null, 2));

  res.status(204).send();
});

module.exports = router;
