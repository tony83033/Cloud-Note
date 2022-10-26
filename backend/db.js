//const mongoose = require('mongoose');
const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/cbook";

const connectDb = ()=>{
    mongoose.connect(URL,()=>{
        console.log("Connected to Database successfully");
    });
}

module.exports = connectDb;