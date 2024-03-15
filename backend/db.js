const mongoose = require('mongoose');






exports.connectDatabase = (url)=>{
    mongoose.connect(url,{
        dbName:"paytm"
    })
    .then((con)=>console.log(`Database connected to ${con.connection.host}`))
    .catch((error)=>console.log(error))


}