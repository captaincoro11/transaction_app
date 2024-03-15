const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isAuthenticated = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({
            message:"Not a valid user"
        })
    }
    const token  = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,process.env.SECRET);
        req.userId = decoded.userId;
        next();



    }
    catch(error){
        res.status(403).json({
            message:"Some error"
        })
    }

}

module.exports = isAuthenticated;