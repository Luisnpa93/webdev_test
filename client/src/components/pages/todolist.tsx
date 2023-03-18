import { useState, useEffect } from 'react';
import '../../sass/todolist.scss';

function TodoList({ userId, tokenn }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [token, setToken] = useState(tokenn);

  
  useEffect(() => {
    // Fetch todos data from server
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, [token, userId]);


  const handleAddTodo = async () => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodoObj = { id: newId, description: newTodo, userId, status: "not done yet" };
    
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodoObj),
      });
      const data = await response.json();
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
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: newDescription, status }),
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteTodo = async (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTodo = async (id, status) => {
    const newStatus = status === "not done yet" ? "done" : "not done yet";
    handleEditTodo(id, todos.find(todo => todo.id === id).description, newStatus);
  }
  

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <ul>
        {Array.isArray(todos) && todos.map((todo) => (
          <li key={todo.id}>
            {todo.description}
            <span style={{ color: todo.status === "not done yet" ? "red" : "green", marginLeft: 10 }}>
              {todo.status}
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
      


