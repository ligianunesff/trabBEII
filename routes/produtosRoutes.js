const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const verifyToken = require('../middlewares/verifyToken');

// Rota para listar todos os produtos (não requer autenticação)
router.get('/', produtoController.getAllProdutos);

// Rota para buscar um produto pelo ID (não requer autenticação)
router.get('/:id', produtoController.getProdutoById);

// Rota para criar um novo produto (requer autenticação)
router.post('/', verifyToken, produtoController.createProduto);

// Rota para atualizar um produto pelo ID (requer autenticação)
router.put('/:id', verifyToken, produtoController.updateProduto);

// Rota para excluir um produto pelo ID (requer autenticação)
router.delete('/:id', verifyToken, produtoController.deleteProduto);

module.exports = router;
