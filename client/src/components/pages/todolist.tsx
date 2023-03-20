import { useState, useEffect } from 'react';
import '../../sass/todolist.scss';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Fetch todos data from server
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todos`);
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchTodos();
  }, []);


  const handleAddTodo = async () => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const now = new Date().toISOString(); // get the current time in ISO format

    const newTodoObj = {
      description: newTodo,
      status: "not done yet",
      createdAt: now, // add the current time to the new todo object
    };
  
    try {
      const response = await axios.post('http://localhost:3000/todos', newTodoObj);
       
      
      const data = await response.data;
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleEditTodo = async (id, newDescription, status) => {
    console.log('id:', id); // add this to check the value of id
    const todoToEdit = todos.find(todo => todo.id === id);
    if (!todoToEdit) {
      console.error('Todo not found'); // add this to check if the todo was found
      return;
    }
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, description: newDescription, status } : todo
    );
    setTodos(newTodos);
    try {
      await axios.patch(`http://localhost:3000/todos/${id}`, { description: newDescription, status });
      
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteTodo = async (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`)

    } catch (error) {
      console.error(error);
    }
  };
  

  const handleToggleTodo = async (id, status) => {
    const newStatus = status === "Not done yet" ? "Done" : "Not done yet";
    handleEditTodo(id, todos.find(todo => todo.id === id).description, newStatus);
  }

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <ul>
      {Array.isArray(todos) && todos.map((todo) => (
  <li key={todo.id}>
    {todo.description}
    <span style={{ color: todo.status === "Not done yet" ? "red" : "green", marginLeft: 10 }}>
      {todo.status}
    </span>
    <span style={{ marginLeft: 10 }}>
      Created at: {new Date(todo.createdAt).toLocaleString()}
    </span>
    <button onClick={() => handleToggleTodo(todo.id, todo.status)}>Change task status</button>
    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
  </li>
))}

      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
  






}

export default TodoList;
      


