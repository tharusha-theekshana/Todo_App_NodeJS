import todo from "../models/Todo.js";
import express from "express";
import controllers from "../controller/todoController.js";

const app = express();


app.get("/", controllers.homePageController);

app.get("/addTodo", controllers.addTodoPageController);

app.get("/updateTodo", controllers.updateTodoPageController);

app.get("/deleteTodo", controllers.deleteTodoPageController);

app.post("/addTodo", controllers.addTodoController);

app.post("/updateTodo/:id", controllers.updateTodoController)

app.get("/confirmDelete", controllers.deleteTodoController)

export default app;