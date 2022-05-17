const express = require("express");
const mongoose= require("mongoose");
const bodyParser = require("body-parser")
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();
const signal = require("signale");
const connection = require("./connection");
const router = require("./router/router");
const PORT = process.env.PORT;
console.log("-----------------------------------------")
connection();

app.use(express.json())
app.use("/home",express.static("public"));
app.use("/api",router)
app.use(bodyParser.json())


app.listen(PORT,()=> {
    signal.info("The server lisning on port", PORT)
})
