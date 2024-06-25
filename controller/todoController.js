import todo from "../models/Todo.js";
import moment from "moment";

const homePageController = async (req, res, next) => {
    try {
        const allTodos = await todo.find({}).sort({createdAt: -1});
        res.locals.moment = moment;
        res.render("index", {title: "Todo List", todos: allTodos});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const addTodoPageController = (req, res, next) => {
    try {
        res.render("newTodo", {title: "Add Todo"});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const updateTodoPageController = async (req, res, next) => {
    try {
        const {id} = req.query;
        const filterTodo = await todo.findById(id);
        res.render("updateTodo",{title : "Update Todo", todo : filterTodo});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const deleteTodoPageController = (req, res, next) => {
    try {
        const {id} = req.query;
        res.render("deleteTodo",{title : "Delete Todo", id : id});

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

const updateTodoController = async  (req, res, next) => {
    try{
        const {id} = req.params;
        const {title,desc} = req.body;

        const updatedTodo = await todo.findById(id);
        if(!updatedTodo){
            res.status(404).json({ message : "Todo not found ... !"});
        }

        updatedTodo.title = title;
        updatedTodo.desc = desc;

        await updatedTodo.save();
        res.redirect("/");

    }catch (e) {
        res.status(500).json({ message : e.message});
    }
}

const deleteTodoController = async  (req, res, next) => {
    try{
        const {id, confirm} = req.query;

        if(confirm === "yes"){
            await todo.findByIdAndDelete(id);
        }

        res.redirect("/");

    }catch (e) {
        res.status(500).json({message : e.message});
    }
}

export default {homePageController, addTodoPageController , updateTodoPageController, deleteTodoPageController , addTodoController, updateTodoController, deleteTodoController};