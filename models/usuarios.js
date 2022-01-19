const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuariosCollection = 'usuarios';

const UsuariosSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
});

UsuariosSchema.pre('save', function (next) {
	const user = this;
	const hash = bcrypt.hashSync(user.password, 10);

	this.password = hash;
	next();
});

module.exports = mongoose.model(usuariosCollection, UsuariosSchema);
