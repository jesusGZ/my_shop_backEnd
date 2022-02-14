const userModel = require('../models/User');
const { SECURITY } = require('../core/config');

async function insertUser(data) {
	const new_user = await new userModel({
		username: data.username,
		email: data.email,
		password: CryptoJS.AES.encrypt(data.password, SECURITY.SECRET_KEY).toString(),
	});

	await new_user.save();
	return new_user;
}

async function getUsers(query) {
	const users = (await query) ? userModel.find().sort({ _id: -1 }).limit(5) : await userModel.find();
	if (users) users = users.toObject();
	return users;
}

async function getUserById(id) {
	let data = await userModel.findById(id);
	if (data) data = data.toObject();
	return data;
}
async function deleteUser(id) {
	let data = await userModel.findByIdAndDelete(id);
	if (data) data = data.toObject();
	return data;
}

async function getStats(lastYear) {
	let data = await userModel.aggregate([
		{
			$match: { createdAt: { $gte: lastYear } },
		},
		{ $project: { month: { $month: '$createdAt' } } },
		{ $group: { _id: '$month', total: { $sum: 1 } } },
	]);

	if (data) data = data.toObject();
	return data;
}

async function updateUser(data) {
	let result = await userModel.findByIdAndUpdate(
		data.id,
		{
			$set: data,
		},
		{ new: true }
	);

	if (result) result = result.toObject();
	return result;
}

module.exports = { insertUser, getUsers, getUserById, getStats, deleteUser, updateUser };
