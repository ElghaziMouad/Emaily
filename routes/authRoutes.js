const passport = require('passport');

// route handler
module.exports = app => {
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email'] //ask for permision
		})
	);

	app.get(
		'/auth/google/callback', 
		passport.authenticate('google')
	);

	app.get('', (req, res) => {
		req.logout();//logout come with user in the cookie
		res.send(req.user);
	})

	app.get('/api/current_user', (req, res) => {
		res.send(req.user)// req.session have the cookie data
	})
}