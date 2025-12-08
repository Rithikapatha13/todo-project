import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { userId: req.userId },
      order: [["createdAt", "ASC"]],
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      userId: req.userId,
    });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.update(req.body, {
      where: { id, userId: req.userId },
    });

    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.destroy({
      where: { id, userId: req.userId },
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
