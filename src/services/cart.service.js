const cartModel = require('../models/Cart');

async function insertCart(data) {
	const new_cart = await new cartModel(data);
	await new_cart.save();
	return new_cart;
}

async function updateCart(data, id) {
	const data = await cartModel.findByIdAndUpdate(id, { $set: data }, { new: true });
	return data;
}

async function deleteCart(id) {
	const data = await cartModel.findByIdAndDelete(id);
	return data;
}

async function getCartByUserId(userId) {
	const data = await cartModel.findOne({ userId: userId });
	return data;
}

async function getCarts() {
	const data = await cartModel.find();
	return data;
}

module.exports = { insertCart, updateCart, deleteCart, getCartByUserId, getCarts };
