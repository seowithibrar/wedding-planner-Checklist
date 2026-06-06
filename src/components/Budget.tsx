import React, { useState } from 'react';
import { 
  CreditCard, 
  Wallet, 
  PieChart as PieChartIcon,
  ArrowUpRight,
  TrendingDown,
  DollarSign,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';
import type { BudgetCategory } from '../App';
import { cn } from '../lib/utils';
import { CURRENCY_SYMBOLS } from '../lib/constants';
import { Modal } from './ui/Modal';

interface BudgetProps {
  budget: {
    total: number;
    categories: BudgetCategory[];
  };
  setBudget: React.Dispatch<React.SetStateAction<{
    total: number;
    categories: BudgetCategory[];
  }>>;
  currency: string;
}

export function Budget({ budget, setBudget, currency }: BudgetProps) {
  const [isTotalModalOpen, setIsTotalModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BudgetCategory | null>(null);
  
  const [totalInput, setTotalInput] = useState(budget.total.toString());
  const [catFormData, setCatFormData] = useState<Partial<BudgetCategory>>({
    name: '',
    allocated: 0,
    spent: 0
  });

  const totalSpent = budget.categories.reduce((acc, cat) => acc + cat.spent, 0);
  const remaining = budget.total - totalSpent;
  const spentPercent = Math.round((totalSpent / budget.total) * 100);
  
  const symbol = CURRENCY_SYMBOLS[currency] || '₨';

  const chartData = budget.categories.map(cat => ({
    name: cat.name,
    allocated: cat.allocated,
    spent: cat.spent
  })).sort((a, b) => b.allocated - a.allocated);

  const handleUpdateTotal = (e: React.FormEvent) => {
    e.preventDefault();
    const newTotal = parseInt(totalInput);
    if (isNaN(newTotal)) return;
    setBudget(prev => ({ ...prev, total: newTotal }));
    setIsTotalModalOpen(false);
  };

  const openAddCategory = () => {
    setEditingCategory(null);
    setCatFormData({ name: '', allocated: 0, spent: 0 });
    setIsCategoryModalOpen(true);
  };

  const openEditCategory = (cat: BudgetCategory) => {
    setEditingCategory(cat);
    setCatFormData({ ...cat });
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setBudget(prev => ({
        ...prev,
        categories: prev.categories.filter(c => c.id !== id)
      }));
    }
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catFormData.name) return;

    if (editingCategory) {
      setBudget(prev => ({
        ...prev,
        categories: prev.categories.map(c => 
          c.id === editingCategory.id ? { ...c, ...catFormData } as BudgetCategory : c
        )
      }));
    } else {
      const newCat: BudgetCategory = {
        id: Date.now(),
        name: catFormData.name!,
        allocated: Number(catFormData.allocated) || 0,
        spent: Number(catFormData.spent) || 0
      };
      setBudget(prev => ({
        ...prev,
        categories: [...prev.categories, newCat]
      }));
    }
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Budget Tracking</h2>
          <p className="text-slate-500 text-sm">Monitor your expenses and stay on target.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsTotalModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors"
          >
            Edit Total
          </button>
          <button 
            onClick={openAddCategory}
            className="flex items-center gap-2 bg-rose-500 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-6 rounded-3xl text-white">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <Wallet size={18} />
            <span className="text-xs font-semibold uppercase tracking-widest">Total Budget</span>
          </div>
          <p className="text-3xl font-bold">{symbol}{budget.total.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-500" 
                style={{ width: `${spentPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-rose-400">{spentPercent}% spent</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <CreditCard size={18} />
            <span className="text-xs font-semibold uppercase tracking-widest">Total Spent</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{symbol}{totalSpent.toLocaleString()}</p>
          <p className="text-xs font-medium text-emerald-500 mt-2 flex items-center gap-1">
            <TrendingDown size={14} /> Within limits
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <DollarSign size={18} />
            <span className="text-xs font-semibold uppercase tracking-widest">Remaining</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{symbol}{remaining.toLocaleString()}</p>
          <p className="text-xs font-medium text-slate-400 mt-2">Available for allocation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-lg">Category Spending</h3>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
              Export CSV
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {budget.categories.map((cat) => (
              <div key={cat.id} className="p-6 group hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-rose-500 transition-all shadow-sm">
                      <DollarSign size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold text-slate-900">{cat.name}</p>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openEditCategory(cat)}
                            className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button 
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">{symbol}{cat.allocated.toLocaleString()} Allocated</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-lg font-bold text-slate-900">{symbol}{cat.spent.toLocaleString()}</p>
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1",
                      cat.spent > cat.allocated ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-500"
                    )}>
                      {cat.spent > cat.allocated ? "Over Budget" : "On Track"}
                    </p>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-1 text-xs flex rounded-full bg-slate-100">
                    <div 
                      style={{ width: `${Math.min(100, (cat.spent / cat.allocated) * 100)}%` }} 
                      className={cn(
                        "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500",
                        cat.spent > cat.allocated ? "bg-rose-500" : "bg-rose-400"
                      )}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{Math.round((cat.spent / cat.allocated) * 100)}% Used</span>
                    <span>{symbol}{(cat.allocated - cat.spent).toLocaleString()} Left</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg mb-6">Allocation Analysis</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(0, 5)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} width={80} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="spent" name="Spent" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#f43f5e" />
                  ))}
                </Bar>
                <Bar dataKey="allocated" name="Allocated" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-allocated-${index}`} fill="#f1f5f9" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-2xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 text-center">Budget Health</p>
            <p className="text-sm text-slate-600 text-center">You are spending most in <span className="font-bold text-slate-900">Venue</span> and <span className="font-bold text-slate-900">Catering</span>. Try to negotiate with photographers for better rates.</p>
          </div>
        </div>
      </div>

      {/* Edit Total Modal */}
      <Modal 
        isOpen={isTotalModalOpen} 
        onClose={() => setIsTotalModalOpen(false)}
        title="Edit Total Budget"
      >
        <form onSubmit={handleUpdateTotal} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Total Amount ({currency})</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{symbol}</span>
              <input
                type="number"
                required
                value={totalInput}
                onChange={e => setTotalInput(e.target.value)}
                className="w-full pl-10 pr-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all font-bold"
              />
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
            >
              Update Budget
            </button>
          </div>
        </form>
      </Modal>

      {/* Category Modal */}
      <Modal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add Budget Category'}
      >
        <form onSubmit={handleCategorySubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Category Name</label>
            <input
              type="text"
              required
              value={catFormData.name}
              onChange={e => setCatFormData({ ...catFormData, name: e.target.value })}
              placeholder="e.g. Venue, Catering, Music"
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Allocated ({symbol})</label>
              <input
                type="number"
                required
                value={catFormData.allocated}
                onChange={e => setCatFormData({ ...catFormData, allocated: Number(e.target.value) })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Spent ({symbol})</label>
              <input
                type="number"
                required
                value={catFormData.spent}
                onChange={e => setCatFormData({ ...catFormData, spent: Number(e.target.value) })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
            >
              {editingCategory ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
