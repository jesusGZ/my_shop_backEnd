const mongoose = require('mongoose');
const chalk = require('chalk');

const { MONGO_DB } = require('../config');

const connected = chalk.bold.cyan,
	error = chalk.bold.yellow,
	disconnected = chalk.bold.red,
	termination = chalk.bold.magenta;

const getConnection = function () {
	return new Promise(async function (resolve, reject) {
		try {
			mongoose.Promise = global.Promise;

			await mongoose.connect(`mongodb://${MONGO_DB.MONGO_HOST}:${MONGO_DB.MONGO_PORT}/${MONGO_DB.MONGO_DB_NAME}?authSource=admin`, {
				user: `${MONGO_DB.MONGO_USER}`,
				pass: `${MONGO_DB.MONGO_PASS}`,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				autoIndex: true,
				serverSelectionTimeoutMS: 5000,
			});

			const db = mongoose.connection;
			resolve(db);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

mongoose.connection.on('connected', () => {
	console.log(connected('La conexión predeterminada de Mongoose está abierta'));
});

mongoose.connection.on('error', (err) => {
	console.log(error('La conexión predeterminada de Mongoose ha pasado ' + err + ' error'));
});

mongoose.connection.on('disconnected', () => {
	console.log(disconnected('La conexión predeterminada de Mongoose está desconectada.'));
});

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log(termination('La conexión predeterminada de Mongoose está desconectada debido a la finalización de la aplicación.'));
		process.exit(0);
	});
});

module.exports = { getConnection };
