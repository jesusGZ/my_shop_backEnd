const productModel = require('../models/Product');

async function insertProduct(data) {
	const new_product = await new productModel(data);
	await new_product.save();
	return new_product;
}

async function updateProduct(data, id) {
	const data = await productModel.findByIdAndUpdate(id, { $set: data }, { new: true });
	return data;
}

async function deleteProduct(id) {
	const data = await productModel.findByIdAndDelete(id);
	return data;
}

async function getProductById(id) {
	const data = await productModel.findOne({ _id: id });
	return data;
}

async function latestProduct() {
	const data = await productModel.find().sort({ createdAt: -1 }).limit(1);
	return data;
}

async function getProductsByCategory(category) {
	const data = await productModel.find({ categories: { $in: [category] } });
	return data;
}

async function getProducts() {
	const data = await productModel.find();
	return data;
}

module.exports = { insertProduct, updateProduct, deleteProduct, getProductById, latestProduct, getProductsByCategory, getProducts };
