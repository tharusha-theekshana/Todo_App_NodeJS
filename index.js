import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = 8000;
const connectionUrl = "mongodb://localhost:27017/todo_db";

mongoose.connect(connectionUrl).then(() =>{
    console.log("Connection success .. !");
}).catch((err) => {
    console.log("Failed to connect with database .. !" + err.message);
})

app.set("view engine","ejs");

app.listen(PORT,() => {
    console.log('Server is running on port ' + PORT);
})