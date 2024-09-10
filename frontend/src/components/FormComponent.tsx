import React, { useState } from "react";

import axios, { AxiosResponse } from "axios";
import TodoList from "./TodoLists";

interface TodoProps {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const baseUrl: string = "http://localhost:4000";

const FormComponent: React.FC<TodoProps> = ({ todos, setTodos }: TodoProps) => {
  const [todo, setTodo] = useState<string>("");

  const addTodo = async () => {
    const res: AxiosResponse<ApiDataType> = await axios.post(
      `${baseUrl}/api/todos`,
      {
        name: todo,
        description: "",
        status: false,
      }
    );
    if (res.data && res.data.todo) {
      setTodos([...todos, res.data.todo]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    addTodo();
    setTodo("");
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  return (
    <div>
      <h1 className=" text-center font-semibold mb-4">Todo App</h1>

      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative w-[400px] mx-auto">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            value={todo}
            onChange={changeHandler}
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
            placeholder="Search branch name..."
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="p-2.5 flex items-center  ms-2 text-sm font-medium border-blue-400  rounded-lg border  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Add List</span>
          </button>
        </div>
      </form>

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default FormComponent;
