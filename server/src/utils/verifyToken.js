const jwt = require("jsonwebtoken");
const keys = require('../config/keys')

module.exports = function(req){
    const token = req.header('x-auth-token')
    
	if (!token) {
		return false
	}
	try {
		const decoded = jwt.verify(token, keys.jwtSecret)
		return  decoded.user
	} catch (err) {
		return false
	}
}
