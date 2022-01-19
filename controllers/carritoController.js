const express = require('express');
const app = express();

const carritoModel = require('../models/carritos');
const productoModel = require('../models/productos');

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

const getCarrito = async (req, res) => {
	const { userID } = req.params;

	if (userID) {
		carritoModel
			.findOne({ userID: userID })
			.then((carrito) => res.json(carrito))
			.catch((err) => res.send(err));
	} else {
		res.status(400).send({
			message: 'No se ha especificado el ID del usuario',
		});
	}
};

const addProducto = async (req, res) => {
	const { userID, productoID, cantidad, userEmail, direccion } = req.params;

	console.log('------DATOS PASADOS EN EL BODY------');
	console.log(userID);
	console.log(productoID);

	if (userID && productoID) {
		const producto = await productoModel.findOne({ _id: productoID });
		const carrito = await carritoModel.findOne({ userID: userID });

		if (!producto) {
			res.status(400).send({
				message: 'El producto no existe',
			});
		}

		let { nombre, precio } = producto;
		console.log(nombre, precio);

		if (carrito) {
			// si existe la relación carrito-usuario
			let productoIndex = carrito.productos.indexOf(
				(p) => p.productoID == productoID
			);

			console.log(productoIndex);
			// si existe producto en el carrito +1 - else, add 1.
			if (productoIndex > -1) {
				let productoItem = carrito.productos[productoIndex];
				productoItem.cantidad += cantidad;
				carrito.productos[productoItem] = productoItem;
			} else {
				carrito.productos.push({
					productoID,
					nombre,
					cantidad,
					precio,
				});
			}

			carrito.total += cantidad * precio;

			let savedCarrito = await carrito.save();

			return res.status(201).send(savedCarrito);
		} else {
			// si no existe carrito para el usuario activo.
			const newCarrito = new carritoModel({
				userEmail,
				userID,
				productos: [{ productoID, nombre, cantidad, precio }],
				direccion,
				total: cantidad * precio,
				timestamp: getTimestamp(),
			});

			console.log(newCarrito);

			let newSavedCarrito = newCarrito.save();

			return res.status(201).send(newSavedCarrito);
		}
	}
};

const deleteProducto = async (req, res, next) => {
	const { productID } = req.params;
	const { userID } = req.body;

	let carrito = await carritoModel.findOne({ userID: userID });
	let productIndex = await carrito.productos.findIndex(
		(p) => p.productID == productID
	);

	if (productIndex > -1) {
		let productItem = carrito.productos[productIndex];

		if (productItem.cantidad == 1) {
			//si ya hay uno solo, elimino el producto entero
			carrito.total -= productItem.precio;
			carrito.productos.splice(productIndex, 1);
		}

		//si hay la cantidad del producto > 1, actualizo la cantidad y el total en el carrito.
		productItem.cantidad -= 1;
		carrito.total -= productItem.cantidad * productItem.precio;
	}

	let savedCarrito = await carrito.save();
	return res.status(201).send(savedCarrito);
};

module.exports = {
	getCarrito,
	addProducto,
	deleteProducto,
};
