// Defining schema here! 

const { date } = require("@hapi/joi/lib/template");

// Connecting the database mongoDB
const mongoose = require("mongoose");  

const userSchema = mongoose.Schema({
    id  :{type : Number , required : true },
    name  :{type : String , required : true },
    lastName :{type:String , required :true },
    email:{type:String , required:true},
    date :{type:date, default : Date.now}
},{collection:"userinfo"});


module.exports = mongoose.model("user" , userSchema); 