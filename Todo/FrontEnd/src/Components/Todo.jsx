// Todo.jsx
import React, { useState, useEffect } from 'react'
import { postTodosData, updateTodoData } from '../Services/api'

const Todo = ({ editTodo, setEditTodo, refreshTodos, setRefreshTodos }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: ""
    })
    
    // Update form when editTodo changes
    useEffect(() => {
        if (editTodo) {
            setFormData({
                title: editTodo.title || "",
                description: editTodo.description || "",
                status: editTodo.status || ""
            });
        }
    }, [editTodo]);
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editTodo) {
                // Update existing todo
                await updateTodoData(editTodo.id, formData);
                setEditTodo(null);
            } else {
                // Create new todo
                await postTodosData(formData);
            }
            
            // Reset form
            setFormData({
                title: "",
                description: "",
                status: ""
            });
            
            // Trigger refresh of todo list
            setRefreshTodos(!refreshTodos);
            
        } catch (error) {
            console.error("Error saving todo:", error);
            alert("Failed to save todo. Please try again.");
        }
    }
    
    const handleCancel = () => {
        setEditTodo(null);
        setFormData({
            title: "",
            description: "",
            status: ""
        });
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{editTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title}
                        onChange={handleChange} 
                        placeholder="Enter todo title" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter todo description" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                        value={formData.status}
                        onChange={handleChange} 
                        name="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                
                <div className="flex space-x-4">
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    >
                        {editTodo ? 'Update Todo' : 'Add Todo'}
                    </button>
                    
                    {editTodo && (
                        <button 
                            type="button" 
                            onClick={handleCancel} 
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Todo
