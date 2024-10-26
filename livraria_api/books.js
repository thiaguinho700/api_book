const express = require('express');
const multer = require('multer');
const Book = require('../back_end/models/Books');
const router = express.Router();
const mongoose = require('mongoose');

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a schema for storing images (if necessary)
const ImageSchema = new mongoose.Schema({
    image: Buffer,
    contentType: String,
});
const Image = mongoose.model('Image', ImageSchema);

// Route to create a new book with an image
router.post('/', upload.single('image'), async (req, res) => {
    const { title, author, year } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            year,
            image: req.file.buffer, // Store image buffer
            contentType: req.file.mimetype, // Store content type
        });
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar livro' });
    }
});

// Route to get all books
router.get('/get', async (req, res) => {
    try {
        const books = await Book.find();
        console.log("Sucesso");
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar os livros', error });
    }
});

// Route to update a book
router.put('/:id', async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar livro', error });
    }
});

// Route to delete a book
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar livro', error });
    }
});

module.exports = router;
