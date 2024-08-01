const course = require("../models/courseModels");
const Module = require("../models/moduleModels")

const createCourse = async (req, res) => {
	try {
		const newcourse = new course(req.body);
		const result = await newcourse.save();
	    res.status(201).send({message : "Course created successfully",result});
		
	} catch (e) {
		res.status(500).send(e);
	}
};

const getAllCourse = async (req,res) =>{
    try {
        result = await course.find({},{__v:0});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateCourse(req,res){
    try {
    const user = await course.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        });
    if (!user){
        res.status(400).send({message:"course not found"});
    }
    res.status(200).send({message : "course updated"});
        
    } catch (error) {
        res.status(500).send(error);
    }
}
async function deleteCourse(req,res){
    // ID = req.params.id;
    try {
        const user = await course.findByIdAndDelete(req.params.id);
        if (!user){
            res.status(400).send({ message : "course not found"});
        }
        res.send({task : user, message : "course deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
}

const assignModule = async (req, res) => {
	const courseId = req.params.id;

	const newcourse = await course.findOne({ _id: courseId });

	if (!newcourse) {
		res.status(404).send({ message: "Unknown courseId" });
	} else {
		const newmodule = await Module.findById(req.body.moduleId);
		if (!newmodule) {
			res.status(404).send({ message: "Unknown moduleId" });
		} else {
			newcourse.modules.push(req.body.moduleId);

			const updateUser = await newcourse.save();

			if (updateUser) {
				res.status(200).send(updateUser);
			}
		}
	}
}


const getCourseModule = async (req, res) => {
	const courseId = req.params.id;
    console.log(courseId);

	const newmodule = await course.findOne({ _id: courseId } , {_id : 0, modules : 1});
    console.log(newmodule);

	if (newmodule) {
		res.status(200).send(newmodule);
	} else {
		res.status(404).send({ message: "Unknown courseId" });
	}
};


async function deleteUserModule(req, res) {
    const courseId = req.params.id;
    const moduleId = req.body.moduleId;
    console.log(courseId);

    try {
        // Find the course by ID
        const newCourse = await course.findById({ _id: courseId });
        if (!newCourse) {
            return res.status(404).send({ message: "Course not found" });
        }

        // Filter out the module to be deleted
        const updatedModules = newCourse.Module.filter(c => c != moduleId);
        newCourse.Module = updatedModules;

        // Save the updated course
        const updatedCourse = await newCourse.save();                                                               

        res.status(200).send(updatedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred", error });
    }
}



module.exports={
    createCourse,
    getAllCourse,
    updateCourse,
    deleteCourse,
    assignModule,
    getCourseModule,
    deleteUserModule
}