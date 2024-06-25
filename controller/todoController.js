import todo from "../models/Todo.js";
import moment from "moment";

const homeController = async (req, res, next) => {
    try {
        const allTodos = await todo.find({}).sort({createdAt: -1});
        res.locals.moment = moment;
        res.render("index", {title: "Todo List", todos: allTodos});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const addTodoControllerRoute = (req, res, next) => {
    try {
        res.render("newTodo", {title: "Add Todo"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const updateTodoController = (req, res, next) => {
    try {
        res.render("updateTodo",{title : "Update Todo"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const deleteTodoController = (req, res, next) => {
    try {
        res.render("deleteTodo",{title : "Delete Todo"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const addTodoController = async  (req, res, next) => {
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
}
export default {homeController, addTodoControllerRoute , updateTodoController, deleteTodoController , addTodoController};