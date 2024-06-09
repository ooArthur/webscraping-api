// Importação de Módulos:
// O módulo express é utilizado para criar e configurar rotas em uma aplicação Node.js.
const express = require('express');

// Importação do Controlador:
// O controlador productController contém a lógica para lidar com as requisições relacionadas aos produtos.
const { searchProducts } = require('../controllers/productController');

// Configuração do Roteador:
// Um roteador é criado utilizando o método Router() do express, permitindo a definição de rotas e seus respectivos manipuladores.
const router = express.Router();

// Definição da Rota de Busca de Produtos:
// A rota GET '/search' é associada à função searchProducts do controlador productController.
router.get('/search', searchProducts);

// Exportação do Roteador:
// O roteador é exportado para que possa ser utilizado em outros arquivos da aplicação, como o arquivo principal da aplicação (app.js).
module.exports = router;
