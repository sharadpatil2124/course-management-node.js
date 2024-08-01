const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    mobile:{
        type : Number,
        require: true,
        unique: true,
    },
    role:{
        type : String,
        enum : ["STUDENT","TEACHER"],
        required : true,
    },
    password:{
        type : String,
        require : true,
    },
    course : [{type : String}],
});

userSchema.pre("save", async function(next){
    const user = this;
    if((user, this.isModified("password"))){
        user.password = await bcrypt.hash(this.password, 8);

    }
    next();
});

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User",userSchema);



