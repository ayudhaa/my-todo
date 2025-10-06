import React from 'react';

export default function Header({ remaining, total }) {
  return (
    <header className="text-center mb-6">
      <h1 className="text-2xl font-light text-gray-700 mb-2">Todo App</h1>
      <p className="text-gray-500 text-sm mb-4">Simple task management</p>
      <div className="flex justify-center gap-4">
        <div className="text-center">
          <div className="text-lg font-medium text-rose-600">{remaining}</div>
          <div className="text-xs text-gray-500">remaining</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-medium text-gray-600">{total}</div>
          <div className="text-xs text-gray-500">total</div>
        </div>
      </div>
    </header>
  );
}