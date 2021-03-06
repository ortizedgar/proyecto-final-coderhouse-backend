const mongoose = require('mongoose');

const carritosCollection = 'carritos';

const CarritosSchema = new mongoose.Schema({
	userEmail: { type: String, require: true, max: 50 },
	userID: { type: String, require: true },
	productos: [
		{
			productoID: { type: String },
			nombre: String,
			cantidad: { type: Number, required: true, default: 1 },
			precio: Number,
		},
	],
	direccion: { type: String, require: true },
	total: { type: Number, required: true, default: 0 },
	timestamp: { type: String, require: true },
});

module.exports = mongoose.model(carritosCollection, CarritosSchema);
