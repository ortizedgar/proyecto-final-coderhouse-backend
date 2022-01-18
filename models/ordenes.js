const mongoose = require('mongoose');

const ordenesCollection = 'ordenes';

const OrdenesSchema = new mongoose.Schema({
	userEmail: {
		type: String,
		required: true,
	},
	numOrden: {
		type: Number,
		required: true,
	},
	productos: [
		{
			productID: {
				type: String,
				required: true,
			},
			nombre: {
				type: String,
				required: true,
			},
			cantidad: {
				type: Number,
				required: true,
			},
			precio: {
				type: Number,
				required: true,
			},
		},
	],
	estado: {
		type: String,
		required: true,
	},
	userID: {
		type: String,
		required: true,
	},
	timestamp: {
		type: String,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model(ordenesCollection, OrdenesSchema);
