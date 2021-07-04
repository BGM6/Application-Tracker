const express = require('express');
const router = express.Router();
const deleteUserController = require('../../controllers/deleteUserController');
const auth = require('../../middleware/auth');

//api/user/delete/:user_id - Delete User
router.route('/delete/:user_id')
	.delete(auth, deleteUserController.deleteUser);

module.exports = router;
