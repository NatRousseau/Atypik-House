const jwtUtils = require('../utils/jwt.utils');

module.exports = (req, res, next) => {
	try {
		let token = req['headers'].authorization;
		if (jwtUtils.isExpired(token)) {
			throw 'Token expired';
		} else {
			next();
		}
	} catch {
		res.status(401).json({ 'error': 'Echec de l authentification' });
	}
};