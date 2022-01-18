const mongoose = require('mongoose');

const productosCollection = 'productos';

const ProductosSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	precio: {
		type: Number,
		required: true,
	},
	imagen: {
		type: String,
		required: true,
	},
	categoria: {
		type: String,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model(productosCollection, ProductosSchema);
