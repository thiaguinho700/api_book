const express = require('express');
const multer = require('multer');
const Book = require('../back_end/models/Books');
const router = express.Router();
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Diretório onde as imagens serão armazenadas
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nomeia o arquivo com a data atual e o nome original
    }
});

const upload = multer({ storage: storage });

// Rota para criar um novo livro com uma imagem
router.post('/', upload.single('image'), async (req, res) => {
    const { title, author, year } = req.body;
    const image = req.file ? req.file.path : null; // Verifique se o arquivo foi enviado

    try {
        // Cria uma nova instância de Book e inclui o caminho da imagem
        const newBook = new Book({
            title,
            author,
            year,
            image
        });

        // Salva o novo livro no banco de dados
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        res.status(500).json({ message: 'Erro ao cadastrar livro', error });
    }
});

// Rota para obter todos os livros
router.get('/get', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar os livros', error });
    }
});

// Rota para atualizar um livro
router.put('/:id', async (req, res) => {
    const { title, author, year } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar livro', error });
    }
});

// Rota para deletar um livro
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar livro', error });
    }
});

module.exports = router;