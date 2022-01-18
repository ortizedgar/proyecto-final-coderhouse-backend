const express = require('express');
const app = express();
const passport = require('passport');
const router = express.Router();

const productosController = require('../controllers/productosController');

// ---------- RUTAS ---------- //
router.get('/:id?', productosController.getProductos);
router.get('/:categoria', productosController.getProductosByCategoria);
router.post('/', productosController.addProducto);
router.delete('/:id', productosController.deleteProducto);

module.exports = router;
