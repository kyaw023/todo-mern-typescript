import React, { useEffect, useState } from "react";
import FormComponent from "./components/formComponent";
import axios, { AxiosResponse } from "axios";

const App: React.FC = () => {
  const baseUrl: string = "http://localhost:4000";
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const fetchTodo = async (): Promise<void> => {
      const res: AxiosResponse<ApiDataType> = await axios.get(
        `${baseUrl}/api/todos`
      );
      console.log(res);
      setTodos(res.data.todos);
    };
    fetchTodo();
  }, []);

  console.log(todos);

  return (
    <div className="max-w-xl mx-auto border mt-20 p-5 rounded">
      <FormComponent todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
