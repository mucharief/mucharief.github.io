import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddTodo = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        
        onAdd({ title, description, completed: false });
        setTitle('');
        setDescription('');
        setIsExpanded(false);
    };

    return (
        <div className="mb-6 bg-white p-4 rounded-xl shadow-md">
            {!isExpanded ? (
                <div 
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-3 text-gray-500 cursor-text"
                >
                    <Plus size={24} />
                    <span>Add a task...</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-lg font-medium outline-none placeholder:text-gray-400"
                        autoFocus
                    />
                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-sm text-gray-600 outline-none resize-none placeholder:text-gray-400"
                        rows={2}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button 
                            type="button" 
                            onClick={() => setIsExpanded(false)}
                            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            disabled={!title.trim()}
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddTodo;
