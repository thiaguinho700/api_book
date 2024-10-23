/*const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

// Rota para registrar novos usuarios

router.post('/register',authController.register)

// rota para login

router.post('/login',authController.login);

module.exports = router;
*/
require("dotenv").config()
const express = require('express');
const router = express.Router();
const authController = require('../back_end/controllers/authController');

// Route for registering new users
router.post('/register', authController.register);

// Route for logging in users
router.post('/login', authController.login);

module.exports = router;