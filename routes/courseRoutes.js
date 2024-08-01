const express = require('express');

const courseControllers = require('../controller/courseController');
const authorise = require('../middleware/authorise');

const courseRoutes = express.Router();


courseRoutes.post("/",courseControllers.createCourse);
// http://localhost:3004/api/course
courseRoutes.get('/',courseControllers.getAllCourse);
// http://localhost:3004/api/course

courseRoutes.put("/:id",courseControllers.updateCourse);
// http://localhost:3004/api/course
courseRoutes.delete("/:id",courseControllers.deleteCourse);
// http://localhost:3004/api/course
courseRoutes.patch("/:id/assignModule",courseControllers.assignModule);
// http://localhost:3004/api/course/id/assignModule
courseRoutes.get("/:id/getCourseModule",courseControllers.getCourseModule);
// http://localhost:3004/api/course/id/getUserModule
courseRoutes.delete("/:id/deleteUserModule",courseControllers.deleteUserModule);
// http://localhost:3004/api/course/id/deleteUserModule

module.exports = courseRoutes; 