const mysql = require('mysql2/promise');
// require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Uni123',
    database: 'TrabBEII'
});

/*connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});*/

module.exports = connection;
