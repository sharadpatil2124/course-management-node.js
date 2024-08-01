const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
	name: {
		type: "String",
		require: true,
	},
	description: {
		type: "String",
	},
    subject:{
        type : 'String',
        require: true,
    },
	lectures: [
        {
            index: {
                type: "Number"
            },
            lecturesId : {
                type: "String"
            }
        }
    ]
});














module.exports = mongoose.model("module",moduleSchema);