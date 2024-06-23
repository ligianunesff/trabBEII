const { connectToDatabase } = require('../configs/database');

class Produto {
    constructor(id, nome, descricao, preco, data_atualizado) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.data_atualizado = data_atualizado;
    }

    static async getAllProdutos() {
        try {
            const connection = await connectToDatabase();
            const [produtos] = await connection.execute('SELECT * FROM produtos');
            console.log(produtos);
            return produtos;
        } catch (error) {
            console.error('Erro ao obter produtos do banco de dados:', error);
            throw error;
        }
    }

    static async getProdutoById(id) {
        try {
            const connection = await connectToDatabase();
            const [produtos] = await connection.execute('SELECT * FROM produtos WHERE id = ?', [id]);
            return produtos[0];
        } catch (error) {
            console.error('Erro ao obter produto do banco de dados:', error);
            throw error;
        }
    }

    static async createProduto(produtoData) {
        try {
            const { nome, descricao, preco, data_atualizado } = produtoData;
            const connection = await connectToDatabase();
            const query = 'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)';
            const [result] = await connection.execute(query, [nome, descricao, preco, data_atualizado]);
            return { id: result.insertId, ...produtoData };
        } catch (error) {
            console.error('Erro ao criar produto no banco de dados:', error);
            throw error;
        }
    }

    static async updateProduto(id, produtoData) {
        try {
            const { nome, descricao, preco, data_atualizado } = produtoData;
            const connection = await connectToDatabase();
            const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?';
            const [result] = await connection.execute(query, [nome, descricao, preco, data_atualizado, id]);
            return result.affectedRows > 0 ? { id, ...produtoData } : null;
        } catch (error) {
            console.error('Erro ao atualizar produto no banco de dados:', error);
            throw error;
        }
    }

    static async deleteProduto(id) {
        try {
            const connection = await connectToDatabase();
            const query = 'DELETE FROM produtos WHERE id = ?';
            const [result] = await connection.execute(query, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir produto do banco de dados:', error);
            throw error;
        }
    }
}

module.exports = Produto;
