module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in555!'})
	}

	console.log('auth check!!!!')
	next();//go to the next middleware
};