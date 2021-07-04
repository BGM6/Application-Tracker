const User = require('../models/UserSchema');
const Applications = require('../models/ApplicationSchema');

//Need to delete user and all applications attached to the user
module.exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.user_id);

		if (!user) {
			return res.status(400).json({msg: 'User not found'});
		}

		if (req.params.user_id === req.user.id) {
			await User.findOneAndRemove({_id: req.user.id});
			res.json({msg: 'User Deleted'});
		} else {
			res.status(400).json({msg: 'Invalid Credentials'});
		}
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({msg: 'User not found'});
		}
		res.status(500).send('SERVER ERROR');
	}
};