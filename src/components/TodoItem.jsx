import React from 'react';

export default function TodoItem({ todo, toggle, remove, startEdit, editingId, editingText, setEditingText, saveEdit, cancelEdit }) {
  return (
    <li className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ${
      todo.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <label className="flex items-center gap-3 flex-1 min-w-0">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => toggle(todo.id)} 
          className="w-4 h-4 rounded border-gray-300 text-rose-500 focus:ring-rose-200"
        />
        <div className="flex-1 min-w-0">
          {editingId === todo.id ? (
            <input
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit(todo.id);
                if (e.key === 'Escape') cancelEdit();
              }}
              className="w-full px-2 py-1 border border-rose-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-300 bg-white"
              autoFocus
            />
          ) : (
            <div className={`break-words ${
              todo.completed 
                ? 'line-through text-gray-400' 
                : 'text-gray-700'
            }`}>
              {todo.text}
            </div>
          )}
          <div className="text-xs text-gray-400 mt-1">
            {new Date(todo.createdAt).toLocaleDateString()}
          </div>
        </div>
      </label>

      <div className="flex items-center gap-1">
        {editingId === todo.id ? (
          <>
            <button 
              onClick={() => saveEdit(todo.id)} 
              className="px-2 py-1 bg-rose-500 text-white rounded text-sm hover:bg-rose-600 transition-colors duration-200"
            >
              Save
            </button>
            <button 
              onClick={cancelEdit} 
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => startEdit(todo)} 
              className="p-1 text-gray-400 hover:text-rose-500 transition-colors duration-200"
            >
              ✏️
            </button>
            <button 
              onClick={() => remove(todo.id)} 
              className="p-1 text-gray-400 hover:text-rose-500 transition-colors duration-200"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  );
}