import express from "express";
import mongoose from "mongoose";
import path from "path";
import {fileURLToPath} from 'url';
import bodyParser from "body-parser";

const app = express();

const PORT = 8000;
const connectionUrl = "mongodb://localhost:27017/todo_db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(connectionUrl).then(() => {
    console.log("Connection success .. !");
}).catch((err) => {
    console.log("Failed to connect with database .. !" + err.message);
})

const todoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxLength : 40,
        minLength : 5,
        unique : true
    },
    desc : String
},{ timestamps : true});

const todo = mongoose.model("todo",todoSchema);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", async  (req, res, next) => {
    try {
        const allTodos = await todo.find({}).sort({createdAt : -1});
        res.render("index", {title : "Todo List", todos :  allTodos });

    } catch (e) {
        res.status(500).json({message: e.message});
    }
})

app.get("/addTodo", (req, res, next) => {
    try {
        res.render("newTodo",{title : "Add Todo"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})

app.get("/updateTodo", (req, res, next) => {
    try {
        res.render("updateTodo",{title : "Update Todo"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})

app.get("/deleteTodo", (req, res, next) => {
    try {
        res.render("deleteTodo",{title : "Delete Todo"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})

app.post("/addTodo",async  (req, res, next) => {
    try{
        const {title,desc} = req.body;

        if(!title){
            return res.status(400).json({ message : "Title is required .. !"});
        }

        const newTodo = new todo({title,desc});
        await newTodo.save();

        res.redirect("/");

    }catch (e) {
        res.status(500).json({ message : e.message});
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})