import React from 'react';
import { 
  CheckCircle2, 
  Users, 
  CreditCard, 
  Clock,
  TrendingUp,
  ArrowUpRight,
  Settings
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip 
} from 'recharts';
import type { Task, BudgetCategory, Guest } from '../App';
import { CURRENCY_SYMBOLS } from '../lib/constants';

interface DashboardProps {
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  budget: {
    total: number;
    categories: BudgetCategory[];
  };
  guests: Guest[];
  couple: { 
    partner1: string; 
    partner2: string;
    contactPerson: string;
    contactNumber: string;
    weddingDate?: string;
  };
  currency: string;
  onOpenSettings: () => void;
  onTabChange: (tab: string) => void;
}

export function Dashboard({ tasks, setTasks, budget, guests, couple, currency, onOpenSettings, onTabChange }: DashboardProps) {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const toggleTask = (taskId: number) => {
    if (setTasks) {
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ));
    }
  };

  const confirmedGuests = guests.filter(g => g.status === 'confirmed').length;
  const totalGuests = guests.length;

  const totalSpent = budget.categories.reduce((acc, cat) => acc + cat.spent, 0);
  const budgetProgress = budget.total > 0 ? Math.round((totalSpent / budget.total) * 100) : 0;

  const symbol = CURRENCY_SYMBOLS[currency] || '₨';

  const formatShort = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(1) + 'k';
    return val.toString();
  };

  const daysToWedding = Math.ceil((new Date(couple.weddingDate || '2026-10-12').getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const formattedDate = new Date(couple.weddingDate || '2026-10-12').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const chartData = [
    { name: 'Spent', value: totalSpent },
    { name: 'Remaining', value: Math.max(0, budget.total - totalSpent) }
  ];

  const COLORS = ['#f43f5e', '#e2e8f0'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, {couple.partner1}!</h2>
          <p className="text-slate-500 text-sm">Everything is looking good for your big day with {couple.partner2}.</p>
        </div>
        <button 
          onClick={onOpenSettings}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
        >
          <Settings size={18} />
          Plan Settings
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          title="Planning Progress" 
          value={`${taskProgress}%`} 
          subtitle={`${completedTasks} of ${totalTasks} tasks done`}
          icon={CheckCircle2}
          color="rose"
        />
        <StatCard 
          title="Guest Responses" 
          value={`${confirmedGuests}/${totalGuests}`} 
          subtitle="Confirmed attendance"
          icon={Users}
          color="blue"
        />
        <StatCard 
          title="Budget Spent" 
          value={`${symbol}${formatShort(totalSpent)}`} 
          subtitle={`${budgetProgress}% of ${symbol}${formatShort(budget.total)}`}
          icon={CreditCard}
          color="emerald"
        />
        <StatCard 
          title="Days to Wedding" 
          value={daysToWedding > 0 ? daysToWedding : 0} 
          subtitle={formattedDate}
          icon={Clock}
          color="amber"
        />
        <StatCard 
          title="Primary Contact" 
          value={couple.contactPerson} 
          subtitle={couple.contactNumber}
          icon={Users}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Budget Overview</h3>
            <button onClick={() => onTabChange('budget')} className="text-xs font-semibold text-rose-500 flex items-center gap-1 hover:underline">
              View full report <ArrowUpRight size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold">{budgetProgress}%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Spent</span>
              </div>
            </div>

            <div className="space-y-4">
              {[...budget.categories].sort((a, b) => b.allocated - a.allocated).slice(0, 4).map(cat => (
                <div key={cat.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">{cat.name}</span>
                    <span className="text-slate-900">{symbol}{cat.spent.toLocaleString()} / {symbol}{cat.allocated.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-500 rounded-full" 
                      style={{ width: `${Math.min(100, (cat.spent / cat.allocated) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {tasks.filter(t => !t.completed).slice(0, 5).map(task => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="mt-0.5 min-w-[20px]">
                  <div className="w-5 h-5 rounded border-2 border-slate-200 flex items-center justify-center group-hover:border-rose-400 transition-colors">
                    {task.completed && <CheckCircle2 size={14} className="text-rose-500" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-medium">{task.category}</span>
                    <span className="text-[10px] text-slate-400">{task.due}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => onTabChange('tasks')} className="w-full mt-6 py-3 border border-slate-100 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all">
            See All Tasks
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }: any) {
  const colorClasses: any = {
    rose: "bg-rose-50 text-rose-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-2xl ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
        <TrendingUp size={16} className="text-emerald-500" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-tight">{subtitle}</p>
      </div>
    </div>
  );
}
