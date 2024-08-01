const Lec = require("../models/lectureModels");

const createLecture = async (req, res) => {
	

	try {
		const newlec = new Lec(req.body);
		const result = await newlec.save();
	    res.status(201).send({message : "lec created successfully",result});
		
	} catch (e) {
		res.status(500).send(e);
	}
};

const getAllLecture = async (req,res) =>{
    try {
        result = await Lec.find({},{__v:0});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateLecture(req,res){
    try {
    const lec = await Lec.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        });
    if (!lec){
        res.status(400).send({message:"lecture not found"});
    }
    res.status(200).send({message :"Lec updated"});
        
    } catch (error) {
        res.status(500).send(error);
    }
}
async function deleteLecture(req,res){
    // ID = req.params.id;
    try {
        const lec = await Lec.findByIdAndDelete(req.params.id);
        if (!lec){
            res.status(400).send({ message : "lec not found"});
        }
        res.send({task : lec, message : "lec deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
}











module.exports={
    createLecture,
    getAllLecture,
    updateLecture,
    deleteLecture

}
