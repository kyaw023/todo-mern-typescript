import List from "./List";

interface TodoProps {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoLists: React.FC<TodoProps> = ({ todos, setTodos }) => {
  return (
    <div
      className=" m-5 space-y-2
    "
    >
      {todos.map((todo) => (
        <div key={todo._id}>
          <List todo={todo} setTodos={setTodos} />
        </div>
      ))}
    </div>
  );
};

export default TodoLists;
