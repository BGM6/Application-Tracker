const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const registerUserController = require('../../controllers/registerUserController');

router.route('/register')
	.post(
		check('name', 'Name is required')
			.not()
			.isEmpty(),
		check('email', 'Please include a valid email')
			.isEmail(),
		check('password', 'Please enter a password with 6 or more characters with at least one number')
			.isLength({min: 6})
			.matches(/\d/),
		registerUserController.registerUser);

module.exports = router;