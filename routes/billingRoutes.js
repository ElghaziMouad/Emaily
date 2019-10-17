const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req,res) => {

		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for credits',
			source: req.body.id
		});

		console.log(charge);

		req.user.credits += 5;
		const user = await req.user.save();	//save the change and update "user"
	
		res.send(user);
	});
};