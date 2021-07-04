require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	//Get token from the header
	const token = req.header('x-auth-token');
	//Check if the token is exist
	if (!token) {
		//Return a status 401 for not authorized
		return res.status(401).json({msg: 'No token, authorization denied'});
	}

	//If there is a token verify the token
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decodedToken.user;
		next();
	} catch (err) {
		res.status(401).json({msg: 'Token is not valid'});
	}
};