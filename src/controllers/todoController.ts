import { Request, Response } from "express";
import Todo, { ITodo } from "../models/Todo.model";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTodo: ITodo = new Todo({
      title,
      description,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error creating todo" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(200).json(updatedTodo);
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(200).json({ message: "Todo deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
};
