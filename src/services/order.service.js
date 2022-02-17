const orderModel = require('../models/Order');

async function insertOrder(data) {
	const new_order = await new orderModel(data);
	await new_order.save();
	return new_order;
}

async function updateOrder(data, id) {
	const data = await orderModel.findByIdAndUpdate(id, { $set: data }, { new: true });
	return data;
}

async function deleteOrder(id) {
	const data = await orderModel.findByIdAndDelete(id);
	return data;
}

async function getOrderByUserId(userId) {
	const data = await orderModel.findOne({ userId: userId });
	return data;
}

async function getOrders() {
	const data = await orderModel.find();
	return data;
}

async function getOrdersIncome(productId, previousMonth) {
	const data = await orderModel.aggregate([
		{
			$match: {
				createdAt: { $gte: previousMonth },
				...(productId && { products: { $elemMatch: { productId } } }),
			},
		},
		{ $project: { month: { $month: '$createdAt' }, sales: '$amount' } },
		{ $group: { _id: '$month', total: { $sum: '$sales' } } },
	]);
	return data;
}

module.exports = { insertOrder, updateOrder, deleteOrder, getOrderByUserId, getOrders, getOrdersIncome };
