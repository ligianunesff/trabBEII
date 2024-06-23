const { connectToDatabase } = require('../configs/database');

class Usuario {
    constructor(id, usuario, senha, token) {
        this.id = id;
        this.usuario = usuario;
        this.senha = senha;
        this.token = token;
    }

    static async getByUsuario(usuario) {
        try {
            const connection = await connectToDatabase();
            const query = 'SELECT * FROM usuarios WHERE usuario = ?';
            const [results, fields] = await connection.execute(query, [usuario]);
            return results[0]; // Retorna o primeiro usuário encontrado
        } catch (error) {
            console.error('Erro ao buscar usuário pelo nome de usuário:', error);
            throw error;
        }
    }
}

module.exports = Usuario;
