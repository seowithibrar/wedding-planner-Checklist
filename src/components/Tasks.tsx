import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle2,
  Circle,
  Calendar,
  AlertCircle,
  Trash2,
  Edit2
} from 'lucide-react';
import type { Task, Priority } from '../App';
import { cn } from '../lib/utils';
import { Modal } from './ui/Modal';

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function Tasks({ tasks, setTasks }: TasksProps) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    category: 'Planning',
    due: new Date().toISOString().split('T')[0],
    priority: 'medium'
  });

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      category: 'Planning',
      due: new Date().toISOString().split('T')[0],
      priority: 'medium'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormData({ ...task });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === editingTask.id ? { ...t, ...formData } as Task : t));
    } else {
      const newTask: Task = {
        id: Date.now(),
        title: formData.title!,
        category: formData.category!,
        due: formData.due!,
        completed: false,
        priority: formData.priority! as Priority
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && t.completed) || 
                         (filter === 'active' && !t.completed);
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Checklist</h2>
          <p className="text-slate-500 text-sm">Keep track of everything you need to do.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-rose-500 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rose-500 transition-shadow outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                filter === 'all' ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('active')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                filter === 'active' ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                filter === 'completed' ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="divide-y divide-slate-100">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-4 hover:bg-slate-50/50 transition-colors group">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 size={22} className="text-rose-500" />
                  ) : (
                    <Circle size={22} className="text-slate-300 group-hover:text-rose-400 transition-colors" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-semibold transition-all",
                    task.completed ? "text-slate-400 line-through" : "text-slate-900"
                  )}>
                    {task.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">{task.category}</span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Calendar size={12} />
                      <span>{task.due}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border",
                    getPriorityColor(task.priority)
                  )}>
                    {task.priority}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openEditModal(task)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No tasks found</p>
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Task Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Book the florist"
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
              >
                {['Planning', 'Venue', 'Catering', 'Photography', 'Decor', 'Music', 'Attire', 'Guests'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Priority</label>
              <select
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Due Date</label>
            <input
              type="date"
              required
              value={formData.due}
              onChange={e => setFormData({ ...formData, due: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
