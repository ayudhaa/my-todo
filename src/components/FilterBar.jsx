import React from 'react';

export default function FilterBar({ filter, setFilter, clearCompleted }) {
  const filters = ['all', 'active', 'completed'];
  
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
              filter === f 
                ? 'bg-white text-rose-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <button 
        onClick={clearCompleted} 
        className="text-sm text-gray-500 hover:text-rose-600 transition-colors duration-200"
      >
        Clear done
      </button>
    </div>
  );
}