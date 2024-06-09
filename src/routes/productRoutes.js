// src/routes/productRoutes.js
const express = require('express');
const { searchProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/search', searchProducts);

module.exports = router;
