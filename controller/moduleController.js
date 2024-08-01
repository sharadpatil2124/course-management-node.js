const Module = require("../models/moduleModels");

const createModule = async (req, res) => {
	

	try {
		const newmodule = new Module(req.body);
		const result = await newmodule.save();
	    res.status(201).send({message : "Course created successfully",result});
		
	} catch (e) {
		res.status(500).send(e);
	}
};

const getAllModule = async (req,res) =>{
    try {
        result = await Module.find({},{__v:0});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
async function updateModule(req,res){
    try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        });
    if (!module){
        res.status(400).send({message:"module not found"});
    }
    res.status(200).send({message : "module updated"});
        
    } catch (error) {
        res.status(500).send(error);
    }
}
async function deleteModule(req,res){
    // ID = req.params.id;
    try {
        const module = await Module.findByIdAndDelete(req.params.id);
        if (!module){
            res.status(400).send({ message : "module not found"});
        }
        res.send({task : module, message : "module deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
}











module.exports ={
    createModule,
    getAllModule,
    updateModule,
    deleteModule
}