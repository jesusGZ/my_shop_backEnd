const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../utils/auth');
const order_controller = require('../controllers/order.controller');

const MODULE = 'orders';

module.exports = (app) => {
	app.post(`${MODULE}/`, verifyToken, async (req, res, next) => {
		try {
			const data = req.body;

			const result = await order_controller.createOrder(data);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.put(`${MODULE}/:id`, verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const id = req.params.id;
			const data = req.body;

			const result = await order_controller.updateOrder(data, id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.delete(`${MODULE}/:id`, verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const id = req.params.id;

			const result = await order_controller.deleteOrder(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/find/:userId`, verifyTokenAndAuthorization, async (req, res, next) => {
		try {
			const userId = req.params.userId;

			const result = await order_controller.getOrder(userId);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/`, verifyTokenAndAdmin, async (res, next) => {
		try {
			const result = await order_controller.getOrders();
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/income`, verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const productId = req.query.pid;

			const result = await order_controller.getOrdersIncome(productId);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
