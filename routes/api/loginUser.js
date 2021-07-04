const express = require('express');
const router = express.Router();
const loginUserController = require('../../controllers/loginUserController');

router.route('/login')
	.get(loginUserController.loginUser);


module.exports = router;