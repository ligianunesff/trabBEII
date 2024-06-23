const clienteModel = require('../models/clienteModel');
const cache = require('../cache'); // Importar o cache
const { logCacheRequest, logDatabaseRequest } = require('../middlewares/logger'); // Importar os loggers

// Função para listar todos os clientes
exports.getAllClientes = async (req, res) => {
  const cacheKey = 'allClientes';
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    logCacheRequest(req, res, () => {}); // Log de requisição para cache
    return res.json(cachedData);
  }

  try {
    const clientes = await clienteModel.getAllClientes();
    cache.set(cacheKey, clientes); // Armazena no cache
    logDatabaseRequest(req, res, () => {}); // Log de requisição para banco de dados
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para buscar um cliente pelo ID
exports.getClienteById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `cliente_${id}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    logCacheRequest(req, res, () => {}); // Log de requisição para cache
    return res.json(cachedData);
  }

  try {
    const cliente = await clienteModel.getClienteById(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    cache.set(cacheKey, cliente); // Armazena no cache
    logDatabaseRequest(req, res, () => {}); // Log de requisição para banco de dados
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para criar um novo cliente
exports.createCliente = async (req, res) => {
  const { nome, sobrenome, email, idade } = req.body;
  try {
    const novoCliente = await clienteModel.createCliente({ nome, sobrenome, email, idade });
    cache.del('allClientes'); // Invalida o cache de todos os clientes
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para atualizar um cliente pelo ID
exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, email, idade } = req.body;
  try {
    const clienteAtualizado = await clienteModel.updateCliente(id, { nome, sobrenome, email, idade });
    if (!clienteAtualizado) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    cache.del('allClientes'); // Invalida o cache de todos os clientes
    cache.del(`cliente_${id}`); // Invalida o cache do cliente específico
    res.json(clienteAtualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para excluir um cliente pelo ID
exports.deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const clienteDeletado = await clienteModel.deleteCliente(id);
    if (!clienteDeletado) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    cache.del('allClientes'); // Invalida o cache de todos os clientes
    cache.del(`cliente_${id}`); // Invalida o cache do cliente específico
    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
