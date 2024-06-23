const db = require('../configs/database');

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
        const query = 'SELECT * FROM clientes';
        const clientes = await db.query(query)

        console.log(clientes)
        //     , (err, results) => {
        //     if (err) {
        //         return 0;
        
        //     }
        //     return results
        // });
    }
}

module.exports = Cliente;
