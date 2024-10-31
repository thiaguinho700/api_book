const mongoose = require('mongoose')

// Define o esquema de usuario

const userSchema = new mongoose.Schema({
    username:{ type: String, required: true, unique: true},
    password: { type: String, required: true},
    idEmployee:{ type: String},
    email:{ type: String},
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads' }
})

// Exporta o modelo de usuário

module.exports = mongoose.model('User',userSchema);