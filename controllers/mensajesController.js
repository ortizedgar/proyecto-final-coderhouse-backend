const express = require('express');
const app = express();

const handlebars = require('express-handlebars');

app.use(express.json());

app.engine(
	'handlebars',
	handlebars({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
	})
);

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

const messagesModel = require('../models/mensajes');

const getMensajes = async (req, res) => {
	res.render('chat', {});
};

const getMensajesByEmail = async (req, res) => {
	const { email } = req.params;

	messagesModel
		.find({ userEmail: email })
		.then((messages) => res.send(messages))
		.catch((err) => res.sendStatus(err));
};

module.exports = {
	getMensajes,
	getMensajesByEmail,
};
