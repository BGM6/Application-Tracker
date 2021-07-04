const express = require('express');
const router = express.Router();
const registerUserController = require('../../controllers/registerUserController');

router.route('/register')
	.post(registerUserController.registerUser)

module.exports = router;