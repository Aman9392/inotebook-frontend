const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inootbook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Sucesfully connected To Mongoose");
    })
}
module.exports = connectToMongo;