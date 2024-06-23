const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verifyToken = require('../middlewares/verifyToken');

// Rota para login
router.post('/login', usuarioController.login);

// Rota para logout (invalida o token JWT)
router.post('/logout', verifyToken, usuarioController.logout);

module.exports = router;
