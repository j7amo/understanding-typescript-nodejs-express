import { RequestHandler } from "express";
import { Todo } from "../models/todo";

let TODOS: Todo[] = [];

// let's add functions to handle CRUD operations
export const createTodo: RequestHandler = (req, res, next) => {
  const { text } = req.body as { text: string };
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  res.status(201).json({ message: "Created TODO", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const { text: updatedText } = req.body as { text: string };
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

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoIdToDelete = req.params.id;
  const todoIdToDeleteIndex = TODOS.findIndex(
    (todo) => todo.id === todoIdToDelete
  );
  const deletedTodo = TODOS[todoIdToDeleteIndex];
  TODOS = TODOS.filter((todo) => todo.id !== todoIdToDelete);

  res.json({ message: "TODO deleted", deletedTodo: deletedTodo });
};
