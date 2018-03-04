const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
		company: {
				type: String,
				required: true
		},
		quantity: Number,
		material: String,
		regDate: {
				type: String
		},
		boxHeight: Number,
		boxWidth: Number,
		divHeight: Number,
		divWidth: Number,
		deadline: String,
		comment: String,
		status: String
});

module.exports = mongoose.model("Orders", OrderSchema);