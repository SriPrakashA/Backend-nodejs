const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    roll_num:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const MyPractice = mongoose.model('MyPractice',dataSchema,'MyPractice');

module.exports = { MyPractice };