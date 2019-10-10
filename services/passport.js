const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require ('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		})
})


passport.use(
	//we can call it 'google' implicity

	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true
	}, 
	(accessToken, refreshToken, profile, done) => {
		// this return a promise and using ES2015
		User.findOne({ googleId: profile.id})
			.then((existingUser) => {
				console.log(existingUser);
				if (existingUser) {
					console.log('existingUser');
					done(null, existingUser);
				} else {
					new User({googleId: profile.id})
						.save()
						.then(user => done(null, user));
				}
			})

        
        
	})
);
//every use to or  out to DB is async request so we cant "const user =User.findOne({ googleId: profile.id})"