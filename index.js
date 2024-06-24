import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const PORT = 8000;
const connectionUrl = "mongodb://localhost:27017/todo_db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(connectionUrl).then(() =>{
    console.log("Connection success .. !");
}).catch((err) => {
    console.log("Failed to connect with database .. !" + err.message);
})

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req, res,next) => {
    try{
res.render("index");
    }catch (e) {
        res.status(500).json({message : e.message});
    }
})

app.get("/addTodo",(req, res,next) => {
    try{
        res.render("newTodo");
    }catch (e) {
        res.status(500).json({message : e.message});
    }
})

app.get("/updateTodo",(req, res,next) => {
    try{
        res.render("updateTodo");
    }catch (e) {
        res.status(500).json({message : e.message});
    }
})

app.get("/deleteTodo",(req, res,next) => {
    try{
        res.render("deleteTodo");
    }catch (e) {
        res.status(500).json({message : e.message});
    }
})


app.listen(PORT,() => {
    console.log('Server is running on port ' + PORT);
})