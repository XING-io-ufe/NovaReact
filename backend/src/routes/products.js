const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
} = require('../controllers/products');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

module.exports = router;