import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { Loader2 } from 'lucide-react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const data = await getTodos();
            // Sort by completion status (incomplete first) then by ID (newest last typically, but depend on DB)
            // Let's sort by ID descending (newest first) for better UX usually, or assume backend order.
            // Backend currently returns findAll() which might be insertion order or ID order.
            // Let's sort created items to top or use backend sort. Backend sends list.
            setTodos(data.sort((a, b) => a.id - b.id)); 
        } catch (err) {
            setError('Failed to fetch tasks.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAdd = async (newTodo) => {
        try {
            const added = await createTodo(newTodo);
            setTodos([...todos, added]);
        } catch (err) {
            console.error('Failed to add todo', err);
        }
    };

    const handleToggle = async (todo) => {
        try {
            const updated = { ...todo, completed: !todo.completed };
            // Optimistic update
            setTodos(todos.map(t => t.id === todo.id ? updated : t));
            await updateTodo(todo.id, updated);
        } catch (err) {
            console.error('Failed to update todo', err);
            // Revert on failure
            setTodos(todos.map(t => t.id === todo.id ? todo : t));
        }
    };

    const handleDelete = async (id) => {
        try {
            // Optimistic update
            const oldTodos = todos;
            setTodos(todos.filter(t => t.id !== id));
            await deleteTodo(id);
        } catch (err) {
            console.error('Failed to delete todo', err);
            setTodos(todos); // Revert? fetching might be safer but inconsistent.
             // Actually, saving oldTodos ref is better.
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-10">
                <p>{error}</p>
                <button onClick={fetchTodos} className="mt-4 underline">Retry</button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Tasks</h1>
            <AddTodo onAdd={handleAdd} />
            
            <div className="space-y-4">
                {todos.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">
                        <p>No tasks yet. Add one above!</p>
                    </div>
                ) : (
                    todos.map(todo => (
                        <TodoItem 
                            key={todo.id} 
                            todo={todo} 
                            onToggle={handleToggle} 
                            onDelete={handleDelete} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
