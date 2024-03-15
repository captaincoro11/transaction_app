const express = require("express");
const dotenv = require('dotenv');
const {connectDatabase} = require('./db.js');
const Routes = require('./routes/index.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
dotenv.config();

const port = 8080;


connectDatabase(process.env.MONGO_URI);

app.use(cors());

app.use(bodyParser.json());


app.use("/api/v1",Routes);

const path = require("path");
app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
res




app.listen(port,()=>{
    console.log(`Your server has been started on port:${port}`);
})











