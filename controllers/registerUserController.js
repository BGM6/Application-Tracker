require('dotenv').config();
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
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
			return res.status(400).json({msg: [{msg: 'User already exist'}]});
		}

		user = new User({
			name,
			email,
			password
		});

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		const payload = {
			user: {
				id: user._id
			}
		};

		const expireTime = {
			expiresIn: 3600000
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			expireTime,
			(err, token) => {
				if (err) throw err;
				res.send({token});
			}
		);

		await user.save();

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};


