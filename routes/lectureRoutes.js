const express = require('express');

const lecControllers = require('../controller/lectureController');

const lectureRoutes = express.Router();


lectureRoutes.post("/",lecControllers.createLecture);
// http://localhost:3004/api/lec
lectureRoutes.get('/',lecControllers.getAllLecture);
// http://localhost:3004/api/lec

lectureRoutes.put("/:id",lecControllers.updateLecture);
// http://localhost:3004/api/lec
lectureRoutes.delete("/:id",lecControllers.deleteLecture);
// http://localhost:3004/api/lec


module.exports = lectureRoutes; 