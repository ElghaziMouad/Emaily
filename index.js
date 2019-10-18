const express = require('express');
const mongoose =require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey')
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//middleware
app.use(bodyParser.json());//make express be able to acess all body of post requests 
app.use(
	cookieSession({
		maxAge: 30*24*60*60*1000,
		keys: [keys.cookieKey]//for security
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//config express in production env
if (process.env.NODE_ENV === 'production') {
	//Express serce up production asset (main.js / main.css)
	app.use(express.static('client/build'));

	//Express will serve up the index.html file
	//if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//envirement heroku variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);

