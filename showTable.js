const mysql = require('mysql2');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');

    // Query para mostrar todos os dados da tabela 'clientes'
    connection.query('SELECT * FROM clientes', (error, results) => {
        if (error) {
            console.error('Erro ao executar a query:', error.stack);
            return;
        }
        console.log('Dados da tabela clientes:', results);
        connection.end(); // Fecha a conexão
    });
});
