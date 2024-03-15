const express = require('express');
const app = express();
const isAuthenticated = require('../middlewares/auth');
const {Account} = require('../model/Account');
const { User } = require('../model/User');
const mongoose = require('mongoose');


const retryOperation = async (operation, maxAttempts = 3) => {
    let attempts = 0;
    while (true) {
        try {
            return await operation();
        } catch (error) {
            if (error instanceof MongoServerError && error.code === 112 && attempts < maxAttempts) {
                console.log(`Encountered Write Conflict error, retrying... (attempt ${attempts + 1})`);
                attempts++;
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
            } else {
                throw error;
            }
        }
    }
};

app.get('/balance', isAuthenticated, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        if (!account) {
            return res.status(401).json({
                message: "Account does not exist"
            });
        }

        const balance = account.balance;
        res.status(200).json({
            message: "Balance fetched successfully",
            balance
        });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


app.post("/transfer", isAuthenticated, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    if(amount === 0 ){
        return res.status(400).json({
            message:"Please Enter some amount"
        })
    }

    
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }



    await Account.findOneAndUpdate({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
     await Account.findOneAndUpdate({ userId: to }, { $inc: { balance: amount } }).session(session);


   
    await session.commitTransaction();

    
    const youraccount = await Account.findOne({userId:req.userId});
    const yourbalance = youraccount.balance;




    res.json({
        message: "Transfer successful",
        yourbalance,
        

    });
});


module.exports = app;
