

import { Todo } from "../models/Todo.js";



// GET /api/todos
export const getTodos = async (req, res) => {
  const todos = await Todo.findAll({ order: [["createdAt", "DESC"]] });
  res.json(todos);
};


// POST /api/todos
export const createTodo = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
};


// PUT /api/todos/:id
export const updateTodo = async (req, res) => {
  const id = req.params.id;
  await Todo.update(req.body, { where: { id } });
  const updated = await Todo.findByPk(id);
  res.json(updated);
};


// DELETE /api/todos/:id
export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  await Todo.destroy({ where: { id } });
  res.json({ message: "Deleted" });
};

