const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	 username: {
	 		type: String,
			unique: true,
			required: true
	 },
		name: String,
		surname: String,
		regDate: {type: Date, default: Date.now},
		permission: String,
		password: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);