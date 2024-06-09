// Importação de Módulos:
// O módulo express é utilizado para criar e configurar a aplicação web em Node.js.
const express = require('express');

// Importação de Rotas:
// As rotas relacionadas aos produtos são importadas do arquivo productRoutes.
const productRoutes = require('./routes/productRoutes');

// Importação do Middleware de Tratamento de Erros:
// O middleware errorHandler é importado para lidar com erros globais na aplicação.
const errorHandler = require('./middlewares/errorMiddleware');

// Criação da Aplicação Express:
// A função express() é chamada para criar uma instância da aplicação Express.
const app = express();

// Configuração de Middleware para o Parse de JSON:
// O middleware express.json() é utilizado para realizar o parse do corpo das requisições com formato JSON.
app.use(express.json());

// Configuração de Rotas:
// As rotas relacionadas aos produtos são definidas como prefixo '/api/products' e associadas à aplicação.
app.use('/api/products', productRoutes);

// Configuração do Middleware de Tratamento de Erros:
// O middleware errorHandler é associado à aplicação para lidar com erros globais.
app.use(errorHandler);

// Exportação da Aplicação:
// A aplicação Express é exportada para que possa ser utilizada em outros arquivos da aplicação, como o arquivo de inicialização (index.js).
module.exports = app;
