const mysql = require('mysql2/promise');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        console.log('Conexão bem-sucedida ao banco de dados MySQL');
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.stack);
        throw error;
    }
}

module.exports = { connectToDatabase };
