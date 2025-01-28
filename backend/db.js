const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/todolist";

const connectToMongo = async() =>{
    try{
        await mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Connected Successfully");
    }catch (error){
        console.log("Error containing to MongoDB", error)
    }
};

module.exports = connectToMongo;