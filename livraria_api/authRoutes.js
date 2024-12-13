/*const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

// Rota para registrar novos usuarios

router.post('/register',authController.register)

// rota para login

router.post('/login',authController.login);

module.exports = router
*/
const upload = require("../back_end/controllers/authController")

require("dotenv").config()
const express = require('express');
const router = express.Router();
const authController = require('../back_end/controllers/authController');
const userList = require("../back_end/models/user");


// Route for registering new users
router.post('/register', upload.upload.single('image') ,authController.register);

// Route for logging in users
router.post('/login', authController.login);

router.get("/", async (req, res) => {
    try {
      const books = await userList.find();
      res.status(210).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar os livros", error });
    }
  });

router.get("/", async (req, res) => {
    try {
      const books = await userList.find();
      res.status(210).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar os livros", error });
    }
  });
  
router.patch("/:id", async (req, res) => {
  const {username,
    password,
    idEmployee,
    email,
    image,
    isOn,
    borrow } = req.body;

  try {
    const updatedBook = await userList.findByIdAndUpdate(
      req.params.id,
      { username,
        password,
        idEmployee,
        email,
        image,
        isOn,borrow },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar livro", error });
  }
});

module.exports = router;