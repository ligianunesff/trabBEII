const produtoModel = require('../models/produtoModel');
const cache = require('../cache'); // Importar o cache

// Função para listar todos os produtos
exports.getAllProdutos = async (req, res) => {
  const cacheKey = 'allProdutos';
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log('[CACHE] Serving from cache');
    return res.json(cachedData);
  }

  try {
    const produtos = await produtoModel.getAllProdutos();
    cache.set(cacheKey, produtos); // Armazena no cache
    console.log('[DB] Serving from database');
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para buscar um produto pelo ID
exports.getProdutoById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `produto_${id}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log('[CACHE] Serving from cache');
    return res.json(cachedData);
  }

  try {
    const produto = await produtoModel.getProdutoById(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    cache.set(cacheKey, produto); // Armazena no cache
    console.log('[DB] Serving from database');
    res.json(produto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para criar um novo produto
exports.createProduto = async (req, res) => {
  const { nome, descricao, preco, data_atualizado } = req.body;
  try {
    const novoProduto = await produtoModel.createProduto({ nome, descricao, preco, data_atualizado });
    cache.del('allProdutos'); // Invalida o cache de todos os produtos
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para atualizar um produto pelo ID
exports.updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, data_atualizado } = req.body;
  try {
    const produtoAtualizado = await produtoModel.updateProduto(id, { nome, descricao, preco, data_atualizado });
    if (!produtoAtualizado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    cache.del('allProdutos'); // Invalida o cache de todos os produtos
    cache.del(`produto_${id}`); // Invalida o cache do produto específico
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para excluir um produto pelo ID
exports.deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoDeletado = await produtoModel.deleteProduto(id);
    if (!produtoDeletado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    cache.del('allProdutos'); // Invalida o cache de todos os produtos
    cache.del(`produto_${id}`); // Invalida o cache do produto específico
    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
