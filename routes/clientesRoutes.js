const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const verifyToken = require('../middlewares/verifyToken');

// Rota para listar todos os clientes (requer autenticação)
router.get('/', verifyToken, clienteController.getAllClientes);

// Rota para buscar um cliente pelo ID (requer autenticação)
router.get('/:id', verifyToken, clienteController.getClienteById);

// Rota para criar um novo cliente (requer autenticação)
router.post('/', verifyToken, clienteController.createCliente);

// Rota para atualizar um cliente pelo ID (requer autenticação)
router.put('/:id', verifyToken, clienteController.updateCliente);

// Rota para excluir um cliente pelo ID (requer autenticação)
router.delete('/:id', verifyToken, clienteController.deleteCliente);

module.exports = router;
