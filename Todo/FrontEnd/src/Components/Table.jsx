// Table.jsx
import React, { useState, useEffect } from 'react';
import { getTodosData, deleteTodoData } from '../Services/api';

const Table = ({ setEditTodo, refreshTodos, setRefreshTodos }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodosData();
        setTodos(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to load todos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [refreshTodos]);

  const handleEdit = (todo) => {
    setEditTodo(todo);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodoData(id);
        setRefreshTodos(!refreshTodos); // Trigger refresh
      } catch (err) {
        console.error('Error deleting todo:', err);
        alert('Failed to delete todo. Please try again.');
      }
    }
  };

  if (loading) return <div>Loading todos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Todo List</h2>
      
      {todos.length === 0 ? (
        <div>
          No todos found. Add a new todo above.
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id} className="hover:bg-gray-50">
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>
                    <span>
                      {todo.status ? todo.status.replace('_', ' ') : 'Not set'}
                    </span>
                  </td>
                  <td>
                    <div>
                      <button
                        onClick={() => handleEdit(todo)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;