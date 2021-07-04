const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/UserSchema');

module.exports.registerUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}

	try {
		const {name, email, password} = req.body;
		let user = await User.findOne({email});

		if (user) {
			return res.status(400).json({errors: [{msg: 'User already exist'}]});
		}

		user = new User(
			{
				name,
				email,
				password
			}
		);

		//Encrypt Password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		//Return Jsonwebtoken
		const payload = {
			user: {
				id: user._id
			}
		};

		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{expiresIn: 360000},
			(err, token) => {
				if (err) throw err;
				res.json({token});
			}
		);
		await user.save();
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

