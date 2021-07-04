require('dotenv').config();
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

module.exports.sendUserCredentials = async (req, res) => {
	//Check if there are any validator errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}
	const {email, password} = req.body;
	//Try to find user
	//Check if user exist
	const user = await User.findOne({email});
	if (!user) {
		return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
	}
	//Check if token is a match with the user credentials
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
	}

	//If everything is good, return jwt
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
			res.json({token});
		}
	);
};

module.exports.findUserAndAuthenticateToken = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error.');
	}
};