interface ITodo {
  name: string;
  description: string;
  status: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoProps {
  todos: ITodo[];
}

type ApiDataType = {
  message: string;
  status: string;
  todos: ITodo[];
  todo?: ITodo;
};
