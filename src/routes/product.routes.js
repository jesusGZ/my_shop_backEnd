const product_controller = require('../controllers/product.controller');
const { verifyTokenAndAdmin } = require('../utils/auth');

const MODULE = 'products';

module.exports = (app) => {
	app.post(`${MODULE}/`, verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const data = req.body;

			const result = await product_controller.createProduct(data);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.put(`${MODULE}/:id`, verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const id = req.params.id;
			const data = req.body;

			const result = await product_controller.updateProduct(data, id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.delete(`${MODULE}/:id`, verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const id = req.params.id;

			const result = await product_controller.deleteProduct(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/find/:id`, async (req, res, next) => {
		try {
			const id = req.params.id;

			const result = await product_controller.getProduct(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get(`${MODULE}/`, async (req, res, next) => {
		try {
			const query_new = req.query.new;
			const category = req.query.category;

			const result = await product_controller.getProducts(query_new, category);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
