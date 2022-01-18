const { Router } = require('express');
const ordenesController = require('../controllers/ordenesController');

const router = Router();

router.get('/:numOrden', ordenesController.getOrdenes);
router.get('/:userID', ordenesController.getOrdenesByID);
router.post('/checkout/:userID', ordenesController.checkout);
router.post('/complete/:numOrden', ordenesController.complete);

module.exports = router;
