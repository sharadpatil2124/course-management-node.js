const User = require("../models/userModels");
const jwt = require('jsonwebtoken')
const course = require("../models/courseModels")

async function addUser(req,res){
    newMobile= req.body.mobile;
    try{
        const userExists = await User.findOne({mobile : newMobile});
    if(userExists){
        res.status(200).send({message : 'User already exists'})
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).send({message : 'register successful'})
    }
 catch (e){
    res.status(500).send(e);
}

}
async function getAllUsers(req , res){
    console.log("*********")
    try {
        result = await User.find({},{__v:0});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function  loginUser(req,res){
    try { 
        newMobile = req.body.mobile;
        password = req.body.password;
        const newUser = await User.findOne({mobile : newMobile});
        if(!newUser){
            res.status(400).send({error : 'Invaild login Credentials'});
        }
        isMatch = await newUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({error : 'Password Incorrect'});
        }
        const token = jwt.sign({_id : newUser._id},'sharad',{expiresIn : '1h'});
        res.status(200).send({acessToken : token});
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateUsers(req,res){
    console.log("UpdateUsers req.body.params.id",req.params.id);
    console.log("updateUsers req.body",req.body);
    try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        });
    if (!user){
        res.status(400).send({message:"user not found"});
    }
    res.status(200).send({message : "user updated"});
        
    } catch (error) {
        res.status(500).send(error);
    }
}
async function deleteUsers(req,res){
    console.log("req.params.id",req.params.id);
    // ID = req.params.id;
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user){
            res.status(400).send({ message : "user not found"});
        }
        res.send({task : user, message : "user deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
}

const assignCourse = async (req, res) => {
	const userId = req.params.id;

	const user = await User.findOne({ _id: userId });

	if (!user) {
		res.status(404).send({ message: "Unknown userId" });
	} else {
		const Course = await course.findById(req.body.courseId);
		if (!Course) {
			res.status(404).send({ message: "Unknown courseId" });
		} else {
			user.course.push(req.body.courseId);

			const updateUser = await user.save();

			if (updateUser) {
				res.status(200).send(updateUser);
			}
		}
	}
}

const getUserCourse = async (req, res) => {
	const userId = req.params.id;
    console.log(userId);

	const user = await User.findOne({ _id: userId } , {_id : 0, course: 1});

	if (user) {
		res.status(200).send(user);
	} else {
		res.status(404).send({ message: "Unknown userId" });
	}
};

async function deleteUserCourse(req,res){
    const userId = req.params.id;
    const courseId = req.body.courseId;
    console.log(userId)

     try {
        const user = await User.findById({ _id: userId })
        console.log(user);

        const userCourses = user.course;
        
        let newList = userCourses.filter(c => {
            return c != courseId;
        });
        console.log(newList);
        user.course = newList;

        const updatedUser = await user.save();

        
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send(error); 
    }
}

async function updateUserCourse (req, res){
    const userId = req.params.id;
    const courseId = req.body.courseId;
    const newCourseId = req.body.newCourseId;
    try { 
        const user = await User.findById({_id : userId});
        const userCourses = user.course;
        console.log(userCourses);

        let newList = await userCourses.filter(c => {
            return c == courseId;
        });

        console.log(newList);
        const indexofcourse = userCourses.indexOf(courseId);
        console.log(indexofcourse);
        user.course =  userCourses[indexofcourse] = newCourseId;

        const updatedUser = await user.save();
        res.status(200).send({message : 'Course Updated',updatedUser});
    } catch (error) {
        res.status(500).send(error); 
    }
}




module.exports={
    addUser,
    loginUser,
    getAllUsers,
    updateUsers,
    deleteUsers,
    assignCourse,
    getUserCourse,
    deleteUserCourse,
    updateUserCourse


}