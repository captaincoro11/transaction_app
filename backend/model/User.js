const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minLength:3,
        maxLength:30,

    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName:{
        type:String,
        required:true,
        maxLength:50,
        trim:true,
    }
});




userSchema.pre('save',async function(next){
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
    }
    next();

});



exports.User =  mongoose.model("User",userSchema) ;

