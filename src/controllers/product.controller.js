const product_service = require('../services/product.service');

const logger = require('../utils/logger');

function createProduct(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await product_service.insertProduct(data);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Product Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function updateProduct(data, id) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await product_service.updateProduct(data, id);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Product Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function deleteProduct(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await product_service.deleteProduct(id);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Product Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getProduct(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await product_service.getProductById(id);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Product Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getProducts(query_new, category) {
	return new Promise(async (resolve, reject) => {
		try {
			let products;

			if (query_new) {
				products = await product_service.latestProduct();
			} else if (category) {
				products = await product_service.getProductsByCategory(category);
			} else {
				products = await product_service.getProducts();
			}

			resolve({ status: 'success', data: products, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Product Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

module.exports = { createProduct, updateProduct, deleteProduct, getProduct, getProducts };
