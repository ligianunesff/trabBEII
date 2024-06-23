const { connectToDatabase } = require('../configs/database');

// Definindo o modelo de dados para a tabela de clientes
class Cliente {
  constructor(id, nome, sobrenome, email, idade) {
    this.id = id;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.idade = idade;
  }

  static async getAllClientes() {
    try {
      const connection = await connectToDatabase();
      const query = 'SELECT * FROM clientes';
      const [clientes] = await connection.query(query);
      console.log(clientes);
      return clientes;
    } catch (error) {
      console.error('Erro ao obter clientes do banco de dados:', error);
      throw error;
    }
  }

  static async getClienteById(id) {
    try {
      const connection = await connectToDatabase();
      const query = 'SELECT * FROM clientes WHERE id = ?';
      const [clientes] = await connection.query(query, [id]);
      return clientes[0];
    } catch (error) {
      console.error('Erro ao obter cliente do banco de dados:', error);
      throw error;
    }
  }

  static async createCliente(clienteData) {
    try {
      const { nome, sobrenome, email, idade } = clienteData;
      const connection = await connectToDatabase();
      const query = 'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)';
      const [result] = await connection.query(query, [nome, sobrenome, email, idade]);
      return { id: result.insertId, ...clienteData };
    } catch (error) {
      console.error('Erro ao criar cliente no banco de dados:', error);
      throw error;
    }
  }

  static async updateCliente(id, clienteData) {
    try {
      const { nome, sobrenome, email, idade } = clienteData;
      const connection = await connectToDatabase();
      const query = 'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?';
      const [result] = await connection.query(query, [nome, sobrenome, email, idade, id]);
      return result.affectedRows > 0 ? { id, ...clienteData } : null;
    } catch (error) {
      console.error('Erro ao atualizar cliente no banco de dados:', error);
      throw error;
    }
  }

  static async deleteCliente(id) {
    try {
      const connection = await connectToDatabase();
      const query = 'DELETE FROM clientes WHERE id = ?';
      const [result] = await connection.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao excluir cliente do banco de dados:', error);
      throw error;
    }
  }
}

module.exports = Cliente;
