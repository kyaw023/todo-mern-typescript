import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface TodoProps {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const List = ({ todo, setTodos }: TodoProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updateName, setUpdateName] = useState<string>(todo.name);
  const [isChecked, setIsChecked] = useState<boolean>(todo.status);

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: AxiosResponse<ApiDataType> = await axios.put(
      `http://localhost:4000/api/todos/${todo._id}`,
      {
        name: updateName,
        status: isChecked,
      }
    );

    if (res.data && res.data.todo) {
      setTodos((prev) =>
        prev.map((t) =>
          t._id == todo._id ? { ...t, status: isChecked, name: updateName } : t
        )
      );
      setIsEdit(false);
    }
  };

  const checkHandler = async () => {
    try {
      // Toggle isChecked value
      const newStatus = !isChecked;

      // Optimistically update local state (optional, for better UI responsiveness)
      setIsChecked(newStatus);

      // Make PUT request to update status
      const res: AxiosResponse<ApiDataType> = await axios.put(
        `http://localhost:4000/api/todos/${todo._id}`,
        {
          status: newStatus, // Send the new status
        }
      );

      if (res.data && res.data.todo) {
        setTodos((prev) =>
          prev.map((t) => (t._id == todo._id ? { ...t, status: newStatus } : t))
        );
      }
    } catch (error) {
      console.error("Error updating todo status:", error);

      // Optionally, reset the state if there's an error
      setIsChecked(isChecked); // Revert back to the original state on error
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/todos/${todo._id}`
      );

      if (res.status === 200) {
        setTodos((prev) => prev.filter((t) => t._id !== todo._id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <form
      onSubmit={handleUpdate}
      className=" flex items-center justify-between border border-blue-400 rounded-md px-4 py-3"
    >
      <div className=" flex items-center space-x-2">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={checkHandler}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
        />
        {isEdit ? (
          <input
            id="default-checkbox"
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            className=" text-blue-600 bg-gray-100 border-gray-300 py-2 rounded px-2 focus:ring-blue-500 "
          />
        ) : (
          <p className={`${todo.status === true ? "line-through" : ""} `}>
            {todo.name}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => editHandler()}
          className=" border border-blue-500 rounded-md text-xs px-3 py-2"
        >
          Edit
        </button>
        {isEdit ? (
          <button
            type="submit"
            className="  bg-red-500 text-slate-100 rounded-md text-xs px-3 py-2"
          >
            Saved
          </button>
        ) : (
          <button
            onClick={() => deleteHandler()}
            type="button"
            className="  bg-red-500 text-slate-100 rounded-md text-xs px-3 py-2"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default List;
