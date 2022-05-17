const mongoose =require("mongoose");
const signale = require("signale");


async function main (){
    // Connecting mongoose to cloud server. 
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology :true});
    const mgDB = mongoose.connection;
    mgDB.on("connected" , console.log.bind(signale.success("MongooDB & mongoose connected")))
}
module.exports = main;