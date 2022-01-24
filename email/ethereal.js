const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: process.env.EMAIL_ADMIN,
		pass: process.env.EMAIL_ADMIN_PASSWORD,
	},
});

const enviarEthereal = (email, asunto, mensaje) => {
	const mailOptions = {
		from: 'SERVIDOR NODE.JS',
		to: email,
		subject: asunto,
		html: mensaje,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

module.exports = {
	enviarEthereal,
};
