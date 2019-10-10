const mongoose = require('mongoose');
const { Schema } = mongoose; 
//const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: String
});

//create new collection 'users' if it not exit
//create model class
mongoose.model("users", userSchema);