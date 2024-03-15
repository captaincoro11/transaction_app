const express = require('express');
const {User} = require("../model/User");
const app = express.Router();
const jwt = require('jsonwebtoken')
const z  = require('zod');
const isAuthenticated = require('../middlewares/auth');
const { Account } = require('../model/Account');
const bcrypt = require('bcrypt')


const SignUpBody = z.object({
    username:z.string().email(),
    password:z.string(),
    firstName:z.string(),
    lastName:z.string()
});

const SignInBody = z.object({
    username:z.string().email(),
    password:z.string(),
    
});

const UpdateBody = z.object({

    password:z.string().optional(),
    lastName:z.string().optional(),
    firstName:z.string().optional()
})

app.post('/signup',async(req,res)=>{
    const {success} =  SignUpBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message:"Please Enter All The Fields "
        })
    }


    
    const existingUser = await User.findOne({
        username:req.body.username
    })
   
    if(existingUser){
        return res.status(411).json({
            message:"Username already exists",
        })
    }

    const user =await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    });

    const userId = user._id

    await Account.create({
        userId,
        balance:1+Math.random()*10000,


    })

    


    const gettoken = jwt.sign({userId:user._id},process.env.SECRET);


    

    res.status(200).json({
        message:"User created succesfully ",
        token:gettoken

    })

});

app.post('/signin',async(req,res)=>{
    const {success} = SignInBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const userFound = await User.findOne({
        username:req.body.username
    });

 
    if(!userFound){
        return res.status(400).json({
            message:"User does not found"
        })
    };

    const matchpassword = await bcrypt.compare(req.body.password,userFound.password);



   if(!matchpassword){
        return res.status(400).json({
            message:"Incorrect Password"
        })
    };

  

    const gettoken = jwt.sign({userId:userFound._id},process.env.SECRET);
    

    res.status(200).json({
        message:"User succesfully signed in",
        token:gettoken
    })
})



app.put('/update',isAuthenticated,async(req,res)=>{
    const {success} = UpdateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Please Enter the fields you want to change"
        })
    }

    const {firstName,lastName,password} = req.body;
    if(password.length<6){
        return res.status(403).json({
            message:"Password length must be greater than 6"
        })
    }

    if(password){
        const hashedpassword = await bcrypt.hash(password,10);
        req.body.password = hashedpassword
       }

    const user = await User.updateOne({_id:req.userId},req.body);




    res.status(200).json({
        message:"User updated succesfully "
    })
    

});


app.get('/bulk',async(req,res)=>{
    const name = req.query.filter;

    if(!name){
        return res.status(400).json({
            message:"Please Enter the name first"
        })
    }

    const users = await User.find({
        $or:[{
            firstName:{
                $regex:name,
                $options:"i",
            }
        },
        {
            lastName:{
                $regex:name,
                $options:"i",
            },

        }]
        
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = app;
