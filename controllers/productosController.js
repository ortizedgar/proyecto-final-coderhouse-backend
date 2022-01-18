const express = require('express');
const app = express();

const handlebars = require('express-handlebars');

app.engine(
	'handlebars',
	handlebars({ extname: '.hbs', defaultLayout: 'index.hbs' })
);

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- IMPORTO EL MODELO ---------- //
const productoModel = require('../models/productos');

const getProductos = async (req, res) => {
	const { id } = req.params;

	if (id) {
		productoModel
			.findOne({ _id: id })
			.then((producto) => res.send(producto))
			.catch((err) => res.send(err));
	}

	productoModel
		.find({})
		.lean()
		.then((productos) => res.render('products', { productos }))
		.catch((err) => res.send(err));
};

const getByCategory = async (req, res) => {
	const { categoria } = req.params;

	productoModel.find({ categoria: categoria }).then((productos) => {
		res.send(productos).catch((err) => res.send(err));
	});
};

const addProducto = async (req, res) => {
	const { nombre, descripcion, categoria, foto, precio, stock } = req.body;

	const productoSaved = new productoModel({
		nombre,
		descripcion,
		categoria,
		foto,
		precio,
		stock,
	});

	productoSaved
		.save()
		.then((producto) => {
			res.send(producto);
		})
		.catch((err) => res.send(err));
};

const deleteProducto = async (req, res) => {
	const { id } = req.params;

	productoModel
		.deleteOne({ _id: id })
		.then((producto) => res.send(producto))
		.catch((err) => res.send(err));
};

module.exports = {
	getProductos,
	getByCategory,
	addProducto,
	deleteProducto,
};
