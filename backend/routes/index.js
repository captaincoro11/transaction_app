const express = require('express');
const {User} = require("../model/User");
const app = express.Router();
const userRouter = require('./user');
const accountRouter = require('./account')

app.use('/user',userRouter);
app.use('/account',accountRouter)


module.exports = app;
