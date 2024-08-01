const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config;
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
// const { mongo } = require('mongoose');
const mongoDB = require('./config/db');
const moduleRoutes = require('./routes/moduleRoutes');
const lectureRoutes = require('./routes/lectureRoutes');

const app = express();
port = 3004;

app.use(express.json());
app.use(bodyParser.json());

mongoDB.connectDB(); 

app.use('/api/addUser',userRoutes);

app.use('/api/getAllUsers',userRoutes);
app.use('/api',userRoutes);
app.use('/api',userRoutes);

// course
app.use('/api/course', courseRoutes);

//modules
app.use('/api/module',moduleRoutes);

//lecture
app.use('/api/lec',lectureRoutes);


app.listen(port,() => console.log("server started at ...",port));

 