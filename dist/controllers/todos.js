"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
let TODOS = [];
// let's add functions to handle CRUD operations
const createTodo = (req, res, next) => {
    const { text } = req.body;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created TODO", createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const { text: updatedText } = req.body;
    const todoIndexToUpdate = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndexToUpdate < 0) {
        throw new Error("Could not find TODO");
    }
    const updatedTodo = TODOS[todoIndexToUpdate];
    updatedTodo.text = updatedText;
    res.json({
        message: "TODO updated!",
        updatedTodo: updatedTodo,
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoIdToDelete = req.params.id;
    const todoIdToDeleteIndex = TODOS.findIndex((todo) => todo.id === todoIdToDelete);
    const deletedTodo = TODOS[todoIdToDeleteIndex];
    TODOS = TODOS.filter((todo) => todo.id !== todoIdToDelete);
    res.json({ message: "TODO deleted", deletedTodo: deletedTodo });
};
exports.deleteTodo = deleteTodo;
