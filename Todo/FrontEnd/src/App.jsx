// App.jsx
import React, { useState } from 'react';
import Todo from './Components/Todo';
import Table from './Components/Table';
import Summarize from './Components/Summarize';

function App() {
  const [editTodo, setEditTodo] = useState(null);
  const [refreshTodos, setRefreshTodos] = useState(false);

  return (
    <div>
      <h1>Todo Manager</h1>
      
      <Todo 
        editTodo={editTodo} 
        setEditTodo={setEditTodo} 
        refreshTodos={refreshTodos} 
        setRefreshTodos={setRefreshTodos} 
      />
      
      <Table 
        setEditTodo={setEditTodo} 
        refreshTodos={refreshTodos} 
        setRefreshTodos={setRefreshTodos} 
      />
      
      <Summarize />
    </div>
  );
}

export default App;
