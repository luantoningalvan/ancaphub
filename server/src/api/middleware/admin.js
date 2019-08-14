const User = require('../models/UserModel')

const admin = async function (req, res, next) {
	const user = await User.findById(req.user.id)

	if (user && user.role.includes('admin')) {
		next()
	} else {
		res.status(401).send({ msg: "Nível de usuário insuficiente, acesso negado." })
	}
}

module.exports = admin