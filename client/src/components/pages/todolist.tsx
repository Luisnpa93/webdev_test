import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import '../../sass/todolist.scss';
import axios from 'axios';

function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const [editableId, setEditableId] = useState(null);
  const [newDescription, setNewDescription] = useState('');

  const fetchTodos = async () => {
    const response = await axios.get(`http://localhost:3000/todos`);
    return response.data;
  };

  const { data: todos, refetch } = useQuery('todos', fetchTodos);

  const addTodoMutation = useMutation<any, Error, { description: string; status: string; createdAt: string }>(async (newTodoObj) => {
    const response = await axios.post('http://localhost:3000/todos', newTodoObj);
    return response.data;
  }, {
    onSuccess: () => {
      refetch();
      setNewTodo('');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const editTodoMutation = useMutation<any, Error, { id: number; newDescription: string; status: string }>(async ({ id, newDescription, status }) => {
    await axios.patch(`http://localhost:3000/todos/${id}`, { description: newDescription, status });
  }, {
    onSuccess: () => {
      refetch();
      setEditableId(null);
      setNewDescription('');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteTodoMutation = useMutation<any, Error, number>(async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
  }, {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleAddTodo = () => {
    const now = new Date().toISOString();

    const newTodoObj = {
      description: newTodo,
      status: "Not done yet",
      createdAt: now,
    };

    addTodoMutation.mutate(newTodoObj);
  };

  const handleEditTodo = (id: number, newDescription: string, status: string) => {
    editTodoMutation.mutate({ id, newDescription, status });
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  const handleToggleTodo = (id: number, status: string) => {
    const newStatus = status === "Not done yet" ? "Done" : "Not done yet";
    handleEditTodo(id, todos.find(todo => todo.id === id).description, newStatus);
  }

  const handleEditButtonClick = (id: number, description: string) => {
    setEditableId(id);
    setNewDescription(description);
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEditTodo(editableId, newDescription, todos.find(todo => todo.id === editableId).status);
  };

  return (
    <div className="todo-list bg-gray-100 min-h-screen py-10">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">Todo List</h2>
        <ul>
          {Array.isArray(todos) &&
            todos.map((todo) => (
              <li key={todo.id} className="border rounded-md p-4 my-4 flex items-center justify-between">
                <div>
                  <span className="font-bold">{todo.description}</span>
                  <span
                    className={`ml-4 py-1 px-2 rounded-full text-xs font-bold ${todo.status === 'Not done yet' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                  >
                    {todo.status}
                  </span>
                  <p className="text-sm text-gray-500">
                    Created at: {new Date(todo.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleTodo(todo.id, todo.status)}
                    className={`px-2 py-1 rounded-full text-xs font-bold ${todo.status === 'Not done yet' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                  >
                    {todo.status === 'Not done yet' ? 'Mark Done' : 'Mark Undone'}
                  </button>
                  <button
                    onClick={() => handleEditButtonClick(todo.id, todo.description)}
                    className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-500 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="px-2 py-1 rounded-full text-xs font-bold bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
                {editableId === todo.id && (
                  <div className="modal bg-white fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                    <form onSubmit={handleEditFormSubmit} className="p-4 border rounded-md">
                      <label htmlFor="newDescription" className="block font-bold mb-2">New Description:</label>
                      <input
                        type="text"
                        id="newDescription"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="border rounded px-2 py-1 mb-2"
                      />
                      <div className="button-group flex justify-end">
                        <button
                          type="submit"
                          className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-bold mr-2"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditableId(null)}
                          className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </li>
            ))}
        </ul>
        <div className="mt-8">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border rounded px-2 py-1 mr-4"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm font-bold"
          >
            Add Todo
</button>
</div>
</div>
  </div>
);
  
  }
  
  export default TodoList;
  