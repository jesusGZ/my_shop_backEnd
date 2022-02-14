const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { SECURITY } = require('../core/config');

const user_service = require('../services/user.service');

const logger = require('../utils/logger');
function createUser(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await user_service.insertUser(data);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('User Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getStats() {
	return new Promise(async (resolve, reject) => {
		try {
			const date = new Date();
			const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

			const data = await user_service.getStats(lastYear);
			resolve({ status: 'success', data: data, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('User Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getUsers(query) {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await user_service.getUsers(query);

			resolve({ status: 'success', data: users, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('User Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function getUser(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await user_service.getUserById(id);
			const { password, ...others } = user._doc;

			resolve({ status: 'success', data: others, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('User Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function deleteUser(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await user_service.deleteUser(id);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('User Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function updateUser(data) {
	return new Promise(async (resolve, reject) => {
		try {
			data.password = CryptoJS.AES.encrypt(data.password, SECURITY.SECRET_KEY).toString();

			const result = await user_service.updateUser(data);

			resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('User Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

function login(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await user_service.getUserByName(data.user_name);
			if (!user) return reject('No se encontraron datos de usuario');

			const hashedPassword = CryptoJS.AES.decrypt(user.password, SECURITY.SECRET_KEY);

			const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

			const inputPassword = data.password;

			if (originalPassword != inputPassword) return reject('No se encontraron datos de usuario');

			const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, SECURITY.JWT_KEY, { expiresIn: SECURITY.JWT_EXPIRATION_USER });

			const { password, ...others } = user._doc;

			resolve({ status: 'success', data: { ...others, accessToken }, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('User Module', error.message);
			reject('Error interno del servidor.');
		}
	});
}

module.exports = { createUser, getStats, getUsers, getUser, deleteUser, updateUser, login };
