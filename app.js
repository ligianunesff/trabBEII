// app.js

const express = require('express');
const app = express();

// Importar as funções de middleware de logger
const { logCacheRequest, logDatabaseRequest } = require('./middlewares/logger');

// Configuração do middleware para processar corpos de requisição JSON
app.use(express.json());

// Usar os middlewares de logger
app.use(logCacheRequest);
app.use(logDatabaseRequest);

// Configuração das rotas
const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientesRoutes');
const produtosRouter = require('./routes/produtosRoutes');
const authRouter = require('./routes/authRoutes');

app.use('/', indexRouter); // Rota padrão
app.use('/clientes', clientesRouter); // Rota para clientes
app.use('/produtos', produtosRouter); // Rota para produtos
app.use('/auth', authRouter); // Rota para autenticação

const PORT = process.env.PORT || 3000; // Define a porta, usando a variável de ambiente PORT ou 3000 como padrão

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
