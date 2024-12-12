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
  

module.exports = router;