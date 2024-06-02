const express = require('express');
const app = express();

// Importar o middleware de logger
const logger = require('./middlewares/logger');

// Configuração do middleware para processar corpos de requisição JSON
app.use(express.json());

// Usar o middleware de logger
app.use(logger);

// Configuração das rotas
const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientesRoutes');
const produtosRouter = require('./routes/produtosRoutes');

app.use('/', indexRouter); // Rota padrão
app.use('/clientes', clientesRouter); // Rota para clientes
app.use('/produtos', produtosRouter); // Rota para produtos

const PORT = process.env.PORT || 3000; // Define a porta, usando a variável de ambiente PORT ou 3000 como padrão

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
