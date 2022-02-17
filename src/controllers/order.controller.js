const order_service = require('../services/order.service');
const logger = require('../utils/logger');

function createOrder(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await order_service.insertOrder(data);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Order Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function updateOrder(data, id) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await order_service.updateOrder(data, id);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Order Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function deleteOrder(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await order_service.deleteOrder(id);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Order Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getOrder(userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await order_service.getOrderByUserId(userId);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Order Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getOrders() {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await order_service.getOrders();

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Order Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getOrdersIncome() {
	return new Promise(async (resolve, reject) => {
		try {
			const date = new Date();
			const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
			const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

			const result = await order_service.getOrdersIncome(productId, previousMonth);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Order Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

module.exports = { createOrder, updateOrder, deleteOrder, getOrder, getOrders, getOrdersIncome };
