const jwtUtils = require('../utils/jwt.utils');

module.exports = (req, res, next) => {
	try {
		let token = req['headers'].authorization;
		if (jwtUtils.isExpired(token)) {
			res.status(401).json({ 'error': 'Token expirée' });
		} else {
			next();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ 'error': 'Authentification échouée !' });
	}
};