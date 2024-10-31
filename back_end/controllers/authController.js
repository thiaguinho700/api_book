const User = require('../models/user'); // Certifique-se de que esse caminho esteja correto
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
require("dotenv").config();

let gfs;

// Conectar ao MongoDB e configurar o GridFS
const conn = mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

conn.once('open', () => {
    // Inicializa o GridFS
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Define a coleção para armazenar arquivos
});

// Configuração do multer para usar armazenamento em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Função de registro de usuário
exports.register = [
    upload.single('image'), // Usa multer para lidar com o campo 'image'
    async (req, res) => {
        const { username, password, idEmployee, email } = req.body;

        try {
            // Verifica se o usuário já existe
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }

            // Criptografa a senha antes de salvar no banco
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Salva a imagem no GridFS
            const imgBuffer = req.file.buffer; // Buffer da imagem
            const writeStream = gfs.createWriteStream({ filename: req.file.fieldname });
            writeStream.write(imgBuffer);
            writeStream.end();

            writeStream.on('close', async (file) => {
                // Cria a URL para acessar a imagem
                const imageUrl = `${req.protocol}://${req.get('host')}/api/files/${file._id}`; // Cria a URL com base no ID do arquivo

                // Cria um novo usuário com a referência da imagem
                const newUser = new User({
                    username,
                    password: hashedPassword,
                    idEmployee,
                    email,
                    image: imageUrl // Armazena a URL da imagem no MongoDB
                });

                await newUser.save();
                res.status(201).json({ message: 'Usuário registrado com sucesso', imageUrl });
            });
        } catch (error) {
            console.error(error); // Loga o erro
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    }
];
// Função de login do usuário
exports.login = async (req, res) => {
    const { username, idEmployee, password } = req.body;
    
    try {
        // Busca usuário pelo nome
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

        // Compara a senha fornecida com a senha armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' });

        console.log("Login realizado");
        res.status(200).json({ message: 'Login realizado com sucesso', user }); // Considere retornar um token ou detalhes do usuário
    } catch (error) {
        console.error(error); // Loga o erro
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};
