const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json());

const mensajesController = require('../controllers/mensajesController');

router.get('/', mensajesController.getMensajes);
router.get('/:email', mensajesController.getMensajesByEmail);

module.exports = router;
