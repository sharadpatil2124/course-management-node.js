const express = require('express');

const userControllers = require('../controller/userController');




const userRoutes = express.Router();

userRoutes.post('/',userControllers.addUser);
// http://localhost:3004/api/addUser

userRoutes.get('/',userControllers.getAllUsers);
// http://localhost:3004/api/getAllUsers

userRoutes.put('/updateUser/:id',userControllers.updateUsers);
// http://localhost:3004/api/updateuser/

userRoutes.delete('/deleteUser/:id',userControllers.deleteUsers);
// http://localhost:3004/api/deleteUser/

userRoutes.patch('/:id/assignCourse',userControllers.assignCourse);
// http://localhost:3004/api/id/assignCourse

userRoutes.get('/:id/getUserCourse',userControllers.getUserCourse);
// http://localhost:3004/api/:id/getUserCourse

userRoutes.post('/login',userControllers.loginUser);
// http://localhost:3004/api/login

userRoutes.delete('/:id/deleteCourse',userControllers.deleteUserCourse);
// http://localhost:3004/api/:id/deleteCourse

userRoutes.patch('/:id/updateCourse',userControllers.updateUserCourse);
// http://localhost:3004/api/:id/updateCourse


module.exports = userRoutes; 
