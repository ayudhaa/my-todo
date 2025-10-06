import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';
import { Notify } from 'notiflix';

const STORAGE_KEY = 'portfolio_todos_v1';

Notify.init({
  width: '320px',
  position: 'right-top',
  distance: '20px',
  borderRadius: '12px',
  timeout: 3000,
  clickToClose: true,
});

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const v = text.trim();
    
    if (!v) {
      Notify.warning('Please enter a task');
      return;
    }
    
    setTodos([{ id: Date.now().toString(), text: v, completed: false, createdAt: new Date().toISOString() }, ...todos]);
    setText('');
    Notify.success('Task added');
  };

  const toggle = (id) => setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const remove = (id) => setTodos(todos.filter(t => t.id !== id));

  const startEdit = (todo) => { setEditingId(todo.id); setEditingText(todo.text); };
  const cancelEdit = () => { setEditingId(null); setEditingText(''); };
  const saveEdit = (id) => {
    const v = editingText.trim();
    if (!v) remove(id);
    else setTodos(todos.map(t => t.id === id ? { ...t, text: v } : t));
    cancelEdit();
  };

  const clearCompleted = () => setTodos(todos.filter(t => !t.completed));
  const filtered = todos.filter(t => filter === 'active' ? !t.completed : filter === 'completed' ? t.completed : true);
  const remaining = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-6">
          <Header remaining={remaining} total={todos.length} />
          
          <form onSubmit={addTodo} className="mb-6">
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white/80 text-gray-700 placeholder-gray-400 transition-all duration-200"
                placeholder="Add a new task..."
              />
              <button 
                type="submit" 
                className="bg-rose-100 text-rose-700 rounded-xl px-4 py-3 hover:bg-rose-200 transition-all duration-200 font-medium whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </form>

          <FilterBar filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />

          <div className="bg-white/50 rounded-xl p-2">
            <ul className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {filtered.length === 0 && (
                <li className="text-center text-gray-400 py-8">
                  <div className="text-4xl mb-3">✨</div>
                  <div>No tasks yet</div>
                </li>
              )}
              {filtered.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggle={toggle}
                  remove={remove}
                  startEdit={startEdit}
                  editingId={editingId}
                  editingText={editingText}
                  setEditingText={setEditingText}
                  saveEdit={saveEdit}
                  cancelEdit={cancelEdit}
                />
              ))}
            </ul>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}