const { Router } = require('express');
const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json());

const carritoController = require('../controllers/carritoController');

router.get('/:userID', carritoController.getCarrito);
router.post('/', carritoController.addProducto);
router.delete('/:productID', carritoController.deleteProducto);

module.exports = router;
