import { ITodo } from "../../types/todo";
import { Request, Response } from "express";
import Todo from "../../model/model";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();

    res.status(200).json({ todos: todos });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    const todo: ITodo = await Todo.create(body);

    const allTodos: ITodo[] = await Todo.find();

    res
      .status(201)
      .json({ message: "Todo added", todo: todo, todos: allTodos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteTodo: ITodo | null = await Todo.findByIdAndDelete(
      req.params.id
    );

    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deleteTodo,
      todos: allTodos,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };
