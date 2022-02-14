const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const user_controller = require('../controllers/user.controller');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../utils/auth');

module.exports = (app) => {
	app.put('/:id', verifyTokenAndAuthorization, async (req, res, next) => {
		try {
			const data = req.body;

			const result = await user_controller.updateUser(data);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.delete('/:id', verifyTokenAndAuthorization, async (req, res, next) => {
		try {
			const id = req.params.id;

			const result = await user_controller.deleteUser(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/find/:id', verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const id = req.params.id;

			const result = await user_controller.getUser(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/', verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const query = req.query.new;

			const result = await user_controller.createUser(query);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/stats', verifyTokenAndAdmin, async (req, res, next) => {
		try {
			const result = await user_controller.getStats();
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.post('/register', async (req, res, next) => {
		try {
			const { username, email, password } = req.body;

			const result = await user_controller.createUser({ username, email, password });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.post('/login', async (req, res) => {
		try {
			const user = await User.findOne({
				userName: req.body.user_name,
			});

			!user && res.status(401).json('Wrong User Name');

			const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

			const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

			const inputPassword = req.body.password;

			originalPassword != inputPassword && res.status(401).json('Wrong Password');

			const accessToken = jwt.sign(
				{
					id: user._id,
					isAdmin: user.isAdmin,
				},
				process.env.JWT_SEC,
				{ expiresIn: '3d' }
			);

			const { password, ...others } = user._doc;
			res.status(200).json({ ...others, accessToken });
		} catch (err) {
			res.status(500).json(err);
		}
	});
};
