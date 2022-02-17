const cart_service = require('../services/cart.service');
const logger = require('../utils/logger');

function createCart(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await cart_service.insertCart(data);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Cart Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function updateCart(data, id) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await cart_service.updateCart(data, id);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Cart Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function deleteCart(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await cart_service.deleteCart(id);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Cart Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getCart(userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await cart_service.getCartByUserId(userId);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Cart Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getCarts() {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await cart_service.getCarts();

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Cart Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

module.exports = { createCart, updateCart, deleteCart, getCart, getCarts };
