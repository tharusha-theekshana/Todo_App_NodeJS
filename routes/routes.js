import todo from "../models/Todo.js";
import express from "express";
import controllers from "../controller/todoController.js";

const app = express();


app.get("/", controllers.homeController);

app.get("/addTodo", controllers.addTodoControllerRoute);

app.get("/updateTodo", controllers.updateTodoController);

app.get("/deleteTodo", controllers.deleteTodoController);

app.post("/addTodo", controllers.addTodoController);

export default app;