const mongoose = require('mongoose'); // Variável mongoose que irá armazenar a conexão futura com o MongoDB
const multer = require('multer');

// Configuração do Multer para lidar com uploads de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a estrutura para salvar o livro no banco de dados
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    year: {
        type: Number // O ano é opcional
    },
    about: {
        type:String // O ano é opcional
    },
    borrow: {
        type:String // O ano é opcional
    },
    image:{type:String},
});

// Exportando o modelo para salvar os livros
module.exports = mongoose.model('Book', BookSchema);
