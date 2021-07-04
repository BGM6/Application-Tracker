const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../../middleware/auth');
const loginUserController = require('../../controllers/loginUserController');


router.route('/login')
	.get(auth, loginUserController.findUserAndAuthenticateToken);

router.route('/login')
	.post(
		check('email', 'Please include a valid email')
			.isEmail(),
		check('password', 'Please enter your password')
			.exists(),
		loginUserController.sendUserCredentials);


module.exports = router;