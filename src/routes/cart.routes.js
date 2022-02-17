const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../utils/auth');
const cart_controller = require('../controllers/cart.controller');

const MODULE = 'carts';

module.exports = (app) => {
	app.post(`${MODULE}/`, verifyToken, async (req, res, next) => {
		try {
			const data = req.body;

			const result = await cart_controller.createCart(data);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.put(`${MODULE}/:id`, verifyTokenAndAuthorization, async (req, res, next) => {
		try {
			const data = req.body;
			const id = req.params.id;

			const result = await cart_controller.updateCart(data, id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.delete(`${MODULE}/:id`, verifyTokenAndAuthorization, async (req, res, next) => {
		try {
			const id = req.params.id;

			const result = await cart_controller.deleteCart(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/find/:userId`, verifyTokenAndAuthorization, async (req, res, next) => {
		try {
			const userId = req.params.userId;

			const result = await cart_controller.getCart(userId);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/`, verifyTokenAndAdmin, async (res, next) => {
		try {
			const result = await cart_controller.getCarts();
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
