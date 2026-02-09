import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <div className={`p-4 mb-2 bg-white rounded-lg shadow-sm flex items-center justify-between transition-all ${todo.completed ? 'opacity-75' : ''}`}>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onToggle(todo)}>
                {todo.completed ? (
                    <CheckCircle className="text-green-500" size={24} />
                ) : (
                    <Circle className="text-gray-400" size={24} />
                )}
                <div>
                    <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.title}
                    </h3>
                    {todo.description && (
                        <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                            {todo.description}
                        </p>
                    )}
                </div>
            </div>
            
            <button 
                onClick={() => onDelete(todo.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete task"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};

export default TodoItem;
