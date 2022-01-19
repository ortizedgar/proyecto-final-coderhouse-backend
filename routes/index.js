const express = require('express');
const passport = require('passport');
const session = require('express-session');

const router = express.Router();
const app = express();

const main = require('./mainRoutes.js');
const productos = require('./productosRoutes.js');
const ordenes = require('./ordenRoutes.js');
const carrito = require('./carritoRoutes.js');
const mensajes = require('./mensajesRoutes.js');
const system = require('./systemRoutes.js');

app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 60000,
		},
	})
);

router.use('/auth', main);
//router.use('/', main);
router.use(
	'/products',
	passport.authenticate('jwt', { session: false }),
	productos
);
router.use(
	'/orders',
	passport.authenticate('jwt', { session: false }),
	ordenes
);
router.use('/cart', passport.authenticate('jwt', { session: false }), carrito);
router.use('/chat', passport.authenticate('jwt', { session: false }), mensajes);
router.use('/system', system);

router.use((req, res) => {
	// res.status(200).json({ message: 'OK' });
	res.redirect('/');
});

module.exports = router;
