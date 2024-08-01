const express = require('express');

const moduleControllers = require("../controller/moduleController");

const moduleRoutes = express.Router();


moduleRoutes.post("/",moduleControllers.createModule);
// http://localhost:3004/api/module
moduleRoutes.get('/',moduleControllers.getAllModule);
// http://localhost:3004/api/module

moduleRoutes.put("/:id",moduleControllers.updateModule);
// http://localhost:3004/api/module

moduleRoutes.delete("/:id",moduleControllers.deleteModule);
// http://localhost:3004/api/module



module.exports = moduleRoutes;