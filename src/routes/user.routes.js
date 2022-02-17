const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../utils/auth');
const user_controller = require('../controllers/user.controller');

const MODULE = 'users';

module.exports = (app) => {
	app.put(`${MODULE}/:id`, verifyTokenAndAuthorization, async (req, res, next) => {
		try {
			const data = req.body;

			const result = await user_controller.updateUser(data);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.delete(`${MODULE}/:id`, verifyTokenAndAuthorization, async (req, res, next) => {
		try {
			const id = req.params.id;

			const result = await user_controller.deleteUser(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/find/:id`, verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const id = req.params.id;

			const result = await user_controller.getUser(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/`, verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const query = req.query.new;

			const result = await user_controller.createUser(query);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/stats`, verifyTokenAndAdmin, async (res, next) => {
		try {
			const result = await user_controller.getStats();
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.post(`${MODULE}/register`, async (req, res, next) => {
		try {
			const { username, email, password } = req.body;

			const result = await user_controller.createUser({ username, email, password });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.post(`${MODULE}/login`, async (req, res, next) => {
		try {
			const { username, password } = req.body;

			const result = await user_controller.login({ username, password });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
