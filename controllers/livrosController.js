const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = './livros.json';

// Leitura e escrita de arquivos
function readData() {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// GET /api/livros
exports.getAll = (req, res) => {
  try {
    const livros = readData();
    res.status(200).json(livros);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao ler os dados' });
  }
};

// GET /api/livros/:id
exports.getById = (req, res) => {
  try {
    const livros = readData();
    const livro = livros.find(l => l.id === req.params.id);

    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.status(200).json(livro);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar o livro' });
  }
};

// POST /api/livros
exports.create = (req, res) => {
  const { titulo, autor, editora, ano } = req.body;

  if (!titulo || !autor || !editora || !ano) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: titulo, autor, editora, ano',
    });
  }

  if (typeof ano !== 'number' || ano < 1000 || ano > 9999) {
    return res.status(400).json({
      erro: 'O campo "ano" deve ser um número de 4 dígitos',
    });
  }

  const novoLivro = {
    id: uuidv4(),
    titulo,
    autor,
    editora,
    ano,
  };

  try {
    const livros = readData();
    livros.push(novoLivro);
    writeData(livros);

    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao salvar o livro' });
  }
};

// DELETE /api/livros/:id
exports.deleteById = (req, res) => {
  try {
    const id = String(req.params.id);
    const livros = readData();
    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
      return res.status(404).json({ erro: 'Livro não encontrado para exclusão' });
    }

    livros.splice(index, 1);
    writeData(livros);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar o livro' });
  }
};
