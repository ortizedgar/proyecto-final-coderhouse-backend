const express = require('express');
const app = express();
const ordenModel = require('../models/ordenes');
const carritoModel = require('../models/carrito');
const userModel = require('../models/user');
const sendEmail = require('../email/ethereal');

app.use(express.json());

const getTimestamp = () => {
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	let timestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
	return timestamp;
};

const getOrdenes = async (req, res) => {
	const { numOrden } = req.params;

	if (numOrden) {
		ordenModel
			.find({ numOrden })
			.then((orden) => res.json(orden))
			.catch((err) => res.send(err));
	} else {
		res.status(400).send({
			message: 'No se ha especificado el número de orden',
		});
	}
};

const getOrdenesByID = async (req, res) => {
	const { userID } = req.params;

	if (userID) {
		ordenModel
			.find({ userID })
			.then((ordenes) => res.json(ordenes))
			.catch((err) => res.send(err));
	} else {
		res.status(400).send({
			message: 'No se ha especificado el ID del usuario',
		});
	}
};

const checkout = async (req, res) => {
    const { userID } = req.params;

    const cart = await carritoModel.findOne({ userID });
    const user = await userModel.findOne({ _id: userID });

    const email = user.email;

    let numOrden = ordenModel.countDocuments({})++;

    if(cart){
        const orden = new ordenModel({
            userEmail: email,
            numOrden,
            productos: cart.productos,
            estado: 'Generado',
            userID,
            timestamp: getTimestamp(),
            total: cart.total
        });
    
        console.log(orden);

        const resetCarrito = await carritoModel.findByIdAndDelete({_id: cart.id});
        sendEmail.enviarEthereal(process.env.EMAIL_ADMIN, `NUEVA ORDEN - USER ID: ${userID}`, JSON.stringify(orden));
        sendEmail.enviarEthereal(email, `¡GRACIAS POR TU ORDEN ${user.name}! - DETALLE`, JSON.stringify(orden));
        
    }
};


const complete = async (req, res) => {
    const { numOrden } = req.params;

    if(numOrden){
        ordenModel.updateOne({numOrden}, {$set: {estado: 'Completado'}})
        .then(() => res.send({message: 'Orden completada'}))
        .catch(err => res.send(err));
    }
    else{
        res.status(400).send({
            message: 'No se ha especificado el número de orden',
        });
    }
};


            

module.exports = {
	getOrdenes,
	getOrdenesByID,
	checkout,
	complete,
};
