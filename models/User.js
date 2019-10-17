const mongoose = require('mongoose');
const { Schema } = mongoose; 
//const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
});

//create new collection 'users' if it not exit
//create model class
mongoose.model("users", userSchema);