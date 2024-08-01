const mongoose = require("mongoose");

const lecSchema = mongoose.Schema({
	name: {
		type: "String",
		require: true,
	},
	description: {
		type: "String",
	},
    teacher:{
        type: String,
    },
    mode:{
        type: String,
        enum:["Online","Offline"],
    }
});




module.exports = mongoose.model("Lec",lecSchema);