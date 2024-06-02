const db = require('../configs/database');

class Produto {
    constructor(id, nome, descricao, preco, data_atualizado) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.data_atualizado = data_atualizado;
    }

    static async getAllProdutos() {
        const query = 'SELECT * FROM produtos';
        const produtos = await db.query(query).execute()
        console.log(produtos)
        //     , (err, results) => {
        //     if (err) {
        //         return 0;
        
        //     }
        //     return results
        // });
    }
}

module.exports = Produto;