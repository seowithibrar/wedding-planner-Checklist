import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash2
} from 'lucide-react';
import type { Guest, GuestStatus } from '../App';
import { cn } from '../lib/utils';
import { Modal } from './ui/Modal';

interface GuestsProps {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
}

export function Guests({ guests, setGuests }: GuestsProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<GuestStatus | 'all'>('all');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Guest>>({
    name: '',
    phone: '',
    status: 'pending',
    meal: 'None',
    plusOne: false
  });

  const deleteGuest = (id: number) => {
    if (confirm('Are you sure you want to remove this guest?')) {
      setGuests(prev => prev.filter(g => g.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingGuest(null);
    setFormData({
      name: '',
      phone: '',
      status: 'pending',
      meal: 'None',
      plusOne: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (guest: Guest) => {
    setEditingGuest(guest);
    setFormData({ ...guest });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingGuest) {
      setGuests(prev => prev.map(g => g.id === editingGuest.id ? { ...g, ...formData } as Guest : g));
    } else {
      const newGuest: Guest = {
        id: Date.now(),
        name: formData.name!,
        phone: formData.phone!,
        status: formData.status! as GuestStatus,
        meal: formData.meal!,
        plusOne: !!formData.plusOne
      };
      setGuests(prev => [newGuest, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredGuests = guests.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) || 
                         g.phone.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || g.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: GuestStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            <CheckCircle2 size={10} /> Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
            <Clock size={10} /> Pending
          </span>
        );
      case 'declined':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
            <XCircle size={10} /> Declined
          </span>
        );
    }
  };

  const confirmedCount = guests.filter(g => g.status === 'confirmed').length;
  const pendingCount = guests.filter(g => g.status === 'pending').length;
  const declinedCount = guests.filter(g => g.status === 'declined').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Guest List</h2>
          <p className="text-slate-500 text-sm">Manage arrivals, RSVPs and preferences.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors">
            <Phone size={18} />
            Contact All
          </button>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-rose-500 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors"
          >
            <UserPlus size={18} />
            Add Guest
          </button>
        </div>
      </div>

      {/* Guest Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="bg-white px-6 py-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 flex-1 min-w-[150px]">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Users size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold">{guests.length}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Invited</p>
          </div>
        </div>
        <div className="bg-white px-6 py-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 flex-1 min-w-[150px]">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold">{confirmedCount}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Confirmed</p>
          </div>
        </div>
        <div className="bg-white px-6 py-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 flex-1 min-w-[150px]">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pending RSVP</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rose-500 transition-shadow outline-none"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {['all', 'confirmed', 'pending', 'declined'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                  filter === tab ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                {tab.charAt(0) + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guest Info</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">RSVP Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dietary Pref</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Plus One</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{guest.name}</p>
                        <p className="text-[11px] text-slate-400">{guest.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {getStatusBadge(guest.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600">
                      {guest.meal || 'No preference'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        guest.plusOne ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
                      )}>
                        {guest.plusOne ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(guest)}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => deleteGuest(guest.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredGuests.length === 0 && (
            <div className="p-12 text-center text-slate-500 font-medium">
              No guests matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Guest Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingGuest ? 'Edit Guest' : 'Add New Guest'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. John Doe"
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +1 555-0000"
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">RSVP Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as GuestStatus })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="declined">Declined</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Plus One</label>
              <select
                value={formData.plusOne ? 'yes' : 'no'}
                onChange={e => setFormData({ ...formData, plusOne: e.target.value === 'yes' })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Dietary Preference</label>
            <input
              type="text"
              value={formData.meal}
              onChange={e => setFormData({ ...formData, meal: e.target.value })}
              placeholder="e.g. Vegan, No Nuts"
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
            >
              {editingGuest ? 'Update Guest' : 'Add to List'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
