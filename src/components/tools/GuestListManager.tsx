import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  UserPlus, Search, Filter, Download, Upload, Printer, Copy, Trash2,
  Edit3, Check, X, ChevronDown, ChevronUp, Users, Heart, Clock,
  XCircle, Plus, Share2, AlertCircle, RotateCcw
} from 'lucide-react';
import guestListData from '../../data/guest-list-data.json';
import type {
  Guest, GuestCategory, MealOption, RSVPStatusOption,
  GuestListStats, SortConfig, SortField, FilterState
} from '../../types/guest-list-types';

const STORAGE_KEY = 'wpc-guest-list-v1';
const CAPACITY_KEY = 'wpc-guest-capacity-v1';

const categories: GuestCategory[] = guestListData.categories;
const mealOptions: MealOption[] = guestListData.mealOptions;
const rsvpStatuses: RSVPStatusOption[] = guestListData.rsvpStatuses;
const defaultSeatingGroups: string[] = guestListData.defaultSeatingGroups;

function generateId(): string {
  return `g_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function createEmptyGuest(): Guest {
  return {
    id: generateId(),
    name: '',
    email: '',
    phone: '',
    category: 'family',
    rsvpStatus: 'pending',
    mealPreference: 'none',
    plusOne: false,
    plusOneName: '',
    plusOneMeal: 'none',
    seatingGroup: 'Unassigned',
    notes: ''
  };
}

function loadGuests(): Guest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* fall through to defaults */ }
  return guestListData.sampleGuests.map(g => ({ ...g, id: generateId() }));
}

function loadCapacity(): number {
  try {
    const raw = localStorage.getItem(CAPACITY_KEY);
    if (raw) return parseInt(raw, 10) || 200;
  } catch { /* fall through */ }
  return 200;
}

function getRsvpColor(status: string): string {
  return rsvpStatuses.find(s => s.id === status)?.color ?? '#94A3B8';
}

function getRsvpLabel(status: string): string {
  return rsvpStatuses.find(s => s.id === status)?.label ?? 'Unknown';
}

function getCategoryLabel(id: string): string {
  return categories.find(c => c.id === id)?.label ?? id;
}

function getCategoryColor(id: string): string {
  return categories.find(c => c.id === id)?.color ?? '#94A3B8';
}

function getMealLabel(id: string): string {
  return mealOptions.find(m => m.id === id)?.label ?? id;
}

/* ──────────────────────────────────────────────
   STAT CARD
   ────────────────────────────────────────────── */
function StatCard({ icon, label, value, accent }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#F3E8EA] p-4 flex items-center gap-3 shadow-sm">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}18` }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-xl font-extrabold text-[#1A1A1A]">{value}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   RSVP PROGRESS BAR
   ────────────────────────────────────────────── */
function RSVPProgressBar({ stats }: { stats: GuestListStats }) {
  const total = stats.total || 1;
  const segments = [
    { pct: (stats.accepted / total) * 100, color: '#10B981', label: 'Accepted' },
    { pct: (stats.pending / total) * 100, color: '#F59E0B', label: 'Pending' },
    { pct: (stats.noResponse / total) * 100, color: '#94A3B8', label: 'No Response' },
    { pct: (stats.declined / total) * 100, color: '#EF4444', label: 'Declined' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
        {segments.map((s, i) => (
          <motion.div
            key={i}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: s.color }}
            initial={{ width: 0 }}
            animate={{ width: `${s.pct}%` }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {segments.map((s, i) => (
          <span key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            {s.label} ({Math.round(s.pct)}%)
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   GUEST ROW (MOBILE CARD)
   ────────────────────────────────────────────── */
function GuestCardMobile({ guest, onEdit, onDelete, isSelected, onToggleSelect }: {
  guest: Guest;
  onEdit: () => void;
  onDelete: () => void;
  isSelected: boolean;
  onToggleSelect: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#F3E8EA] p-4 shadow-sm space-y-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="w-4 h-4 rounded border-slate-300 accent-[#B76E79] shrink-0"
            aria-label={`Select ${guest.name}`}
          />
          <div className="min-w-0">
            <p className="font-bold text-sm text-[#1A1A1A] truncate">{guest.name || 'Unnamed Guest'}</p>
            {guest.email && <p className="text-xs text-slate-400 truncate">{guest.email}</p>}
          </div>
        </div>
        <span
          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shrink-0"
          style={{ backgroundColor: getRsvpColor(guest.rsvpStatus) }}
        >
          {getRsvpLabel(guest.rsvpStatus)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-slate-400">Category</span>
          <p className="font-semibold text-slate-700">{getCategoryLabel(guest.category)}</p>
        </div>
        <div>
          <span className="text-slate-400">Meal</span>
          <p className="font-semibold text-slate-700">{getMealLabel(guest.mealPreference)}</p>
        </div>
        <div>
          <span className="text-slate-400">Table</span>
          <p className="font-semibold text-slate-700">{guest.seatingGroup}</p>
        </div>
        <div>
          <span className="text-slate-400">Plus One</span>
          <p className="font-semibold text-slate-700">
            {guest.plusOne ? (guest.plusOneName || 'Yes') : 'No'}
          </p>
        </div>
      </div>

      {guest.notes && (
        <p className="text-xs text-slate-400 italic border-t border-slate-100 pt-2">{guest.notes}</p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"
          aria-label={`Edit ${guest.name}`}
        >
          <Edit3 size={13} /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-400 text-xs font-semibold hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label={`Delete ${guest.name}`}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   GUEST EDIT MODAL
   ────────────────────────────────────────────── */
function GuestEditModal({ guest, onSave, onCancel, seatingGroups }: {
  guest: Guest;
  onSave: (g: Guest) => void;
  onCancel: () => void;
  seatingGroups: string[];
}) {
  const [form, setForm] = useState<Guest>({ ...guest });
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const update = (field: keyof Guest, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      nameRef.current?.focus();
      return;
    }
    onSave(form);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  const selectStyles = "w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 transition-all bg-white";
  const inputStyles = "w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 transition-all";
  const labelStyles = "block text-[11px] font-bold uppercase tracking-wider text-[#B76E79] mb-1.5";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label={form.name ? `Edit ${form.name}` : 'Add new guest'}
    >
      <motion.form
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1A1A1A]">
            {guest.name ? 'Edit Guest' : 'Add New Guest'}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelStyles} htmlFor="guest-name">Guest Name *</label>
            <input
              id="guest-name"
              ref={nameRef}
              type="text"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              placeholder="e.g. Sarah Mitchell"
              className={inputStyles}
              required
            />
          </div>

          <div>
            <label className={labelStyles} htmlFor="guest-email">Email</label>
            <input
              id="guest-email"
              type="email"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="email@example.com"
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles} htmlFor="guest-phone">Phone</label>
            <input
              id="guest-phone"
              type="tel"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles} htmlFor="guest-category">Category</label>
            <select
              id="guest-category"
              value={form.category}
              onChange={e => update('category', e.target.value)}
              className={selectStyles}
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelStyles} htmlFor="guest-rsvp">RSVP Status</label>
            <select
              id="guest-rsvp"
              value={form.rsvpStatus}
              onChange={e => update('rsvpStatus', e.target.value)}
              className={selectStyles}
            >
              {rsvpStatuses.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelStyles} htmlFor="guest-meal">Meal Preference</label>
            <select
              id="guest-meal"
              value={form.mealPreference}
              onChange={e => update('mealPreference', e.target.value)}
              className={selectStyles}
            >
              {mealOptions.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelStyles} htmlFor="guest-seating">Seating Group</label>
            <select
              id="guest-seating"
              value={form.seatingGroup}
              onChange={e => update('seatingGroup', e.target.value)}
              className={selectStyles}
            >
              {seatingGroups.map(sg => (
                <option key={sg} value={sg}>{sg}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Plus One */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="guest-plusone"
              checked={form.plusOne}
              onChange={e => update('plusOne', e.target.checked)}
              className="w-4 h-4 rounded accent-[#B76E79]"
            />
            <label htmlFor="guest-plusone" className="text-sm font-semibold text-[#1A1A1A]">
              Has a plus-one
            </label>
          </div>

          {form.plusOne && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label className={labelStyles} htmlFor="plusone-name">Plus-One Name</label>
                <input
                  id="plusone-name"
                  type="text"
                  value={form.plusOneName}
                  onChange={e => update('plusOneName', e.target.value)}
                  placeholder="Guest's name"
                  className={inputStyles}
                />
              </div>
              <div>
                <label className={labelStyles} htmlFor="plusone-meal">Plus-One Meal</label>
                <select
                  id="plusone-meal"
                  value={form.plusOneMeal}
                  onChange={e => update('plusOneMeal', e.target.value)}
                  className={selectStyles}
                >
                  {mealOptions.map(m => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>

        <div>
          <label className={labelStyles} htmlFor="guest-notes">Notes</label>
          <textarea
            id="guest-notes"
            value={form.notes}
            onChange={e => update('notes', e.target.value)}
            placeholder="Dietary restrictions, travel notes, etc."
            rows={2}
            className={`${inputStyles} resize-none`}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#B76E79] hover:bg-[#a25d66] text-white px-6 py-3 rounded-2xl text-sm font-bold transition-colors shadow-md"
          >
            {guest.name ? 'Save Changes' : 'Add Guest'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────── */
export function GuestListManager() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [capacity, setCapacity] = useState<number>(200);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'name', direction: 'asc' });
  const [filters, setFilters] = useState<FilterState>({
    search: '', rsvpStatus: '', category: '', mealPreference: '', seatingGroup: ''
  });
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setGuests(loadGuests());
    setCapacity(loadCapacity());
    setIsLoaded(true);
  }, []);

  // Persist to localStorage on change (debounced)
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
      localStorage.setItem(CAPACITY_KEY, String(capacity));
    }, 300);
    return () => clearTimeout(timer);
  }, [guests, capacity, isLoaded]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  }, []);

  // Build seating groups from defaults + custom ones already in use
  const seatingGroups = useMemo(() => {
    const set = new Set(defaultSeatingGroups);
    guests.forEach(g => {
      if (g.seatingGroup) set.add(g.seatingGroup);
    });
    return Array.from(set).sort();
  }, [guests]);

  // Stats
  const stats: GuestListStats = useMemo(() => {
    const s: GuestListStats = {
      total: guests.length,
      accepted: 0, declined: 0, pending: 0, noResponse: 0,
      plusOnes: 0, estimatedHeadcount: 0, mealBreakdown: {}
    };
    guests.forEach(g => {
      if (g.rsvpStatus === 'accepted') s.accepted++;
      else if (g.rsvpStatus === 'declined') s.declined++;
      else if (g.rsvpStatus === 'pending') s.pending++;
      else s.noResponse++;

      if (g.plusOne) s.plusOnes++;

      if (g.mealPreference && g.mealPreference !== 'none') {
        s.mealBreakdown[g.mealPreference] = (s.mealBreakdown[g.mealPreference] || 0) + 1;
      }
      if (g.plusOne && g.plusOneMeal && g.plusOneMeal !== 'none') {
        s.mealBreakdown[g.plusOneMeal] = (s.mealBreakdown[g.plusOneMeal] || 0) + 1;
      }
    });
    s.estimatedHeadcount = s.accepted + s.plusOnes + Math.round(s.pending * 0.7);
    return s;
  }, [guests]);

  // Filter and sort
  const filteredGuests = useMemo(() => {
    let result = [...guests];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q) ||
        g.notes.toLowerCase().includes(q) ||
        g.plusOneName.toLowerCase().includes(q)
      );
    }
    if (filters.rsvpStatus) result = result.filter(g => g.rsvpStatus === filters.rsvpStatus);
    if (filters.category) result = result.filter(g => g.category === filters.category);
    if (filters.mealPreference) result = result.filter(g => g.mealPreference === filters.mealPreference);
    if (filters.seatingGroup) result = result.filter(g => g.seatingGroup === filters.seatingGroup);

    result.sort((a, b) => {
      const valA = (a[sortConfig.field] || '').toLowerCase();
      const valB = (b[sortConfig.field] || '').toLowerCase();
      const cmp = valA.localeCompare(valB);
      return sortConfig.direction === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [guests, filters, sortConfig]);

  const activeFilterCount = useMemo(() => {
    return [filters.rsvpStatus, filters.category, filters.mealPreference, filters.seatingGroup]
      .filter(Boolean).length;
  }, [filters]);

  // CRUD operations
  const addGuest = () => {
    setEditingGuest(createEmptyGuest());
  };

  const saveGuest = (g: Guest) => {
    setGuests(prev => {
      const idx = prev.findIndex(x => x.id === g.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = g;
        return updated;
      }
      return [...prev, g];
    });
    setEditingGuest(null);
    showToast(guests.find(x => x.id === g.id) ? 'Guest updated!' : 'Guest added!');
  };

  const deleteGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    showToast('Guest removed');
  };

  const deleteSelected = () => {
    if (selectedIds.size === 0) return;
    setGuests(prev => prev.filter(g => !selectedIds.has(g.id)));
    setSelectedIds(new Set());
    showToast(`${selectedIds.size} guest(s) removed`);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredGuests.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredGuests.map(g => g.id)));
    }
  };

  const handleSort = (field: SortField) => {
    setSortConfig(prev =>
      prev.field === field
        ? { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { field, direction: 'asc' }
    );
  };

  const clearFilters = () => {
    setFilters({ search: '', rsvpStatus: '', category: '', mealPreference: '', seatingGroup: '' });
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Category', 'RSVP Status', 'Meal', 'Plus One', 'Plus One Name', 'Plus One Meal', 'Seating Group', 'Notes'];
    const rows = guests.map(g => [
      g.name, g.email, g.phone, getCategoryLabel(g.category), getRsvpLabel(g.rsvpStatus),
      getMealLabel(g.mealPreference), g.plusOne ? 'Yes' : 'No', g.plusOneName,
      getMealLabel(g.plusOneMeal), g.seatingGroup, g.notes
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wedding-guest-list-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Guest list exported as CSV!');
  };

  // Import CSV
  const importCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (!text) return;
      const lines = text.split('\n').filter(l => l.trim());
      if (lines.length < 2) {
        showToast('CSV file is empty or invalid');
        return;
      }
      const newGuests: Guest[] = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)?.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"')) || [];
        if (cols.length >= 1 && cols[0]?.trim()) {
          newGuests.push({
            id: generateId(),
            name: cols[0]?.trim() || '',
            email: cols[1]?.trim() || '',
            phone: cols[2]?.trim() || '',
            category: categories.find(c => c.label.toLowerCase() === cols[3]?.trim().toLowerCase())?.id || 'friends',
            rsvpStatus: 'pending',
            mealPreference: 'none',
            plusOne: false,
            plusOneName: '',
            plusOneMeal: 'none',
            seatingGroup: 'Unassigned',
            notes: cols[4]?.trim() || ''
          });
        }
      }
      if (newGuests.length > 0) {
        setGuests(prev => [...prev, ...newGuests]);
        showToast(`${newGuests.length} guest(s) imported!`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Copy summary
  const copySummary = async () => {
    const summary = [
      `Wedding Guest List Summary`,
      `Total Invited: ${stats.total}`,
      `Accepted: ${stats.accepted} | Declined: ${stats.declined} | Pending: ${stats.pending}`,
      `Plus Ones: ${stats.plusOnes}`,
      `Estimated Headcount: ${stats.estimatedHeadcount}`,
      ``,
      `Guests:`,
      ...guests.map(g =>
        `• ${g.name} — ${getRsvpLabel(g.rsvpStatus)} — ${getCategoryLabel(g.category)}${g.plusOne ? ` (+1: ${g.plusOneName || 'TBD'})` : ''}`
      )
    ].join('\n');
    try {
      await navigator.clipboard.writeText(summary);
      showToast('Guest list summary copied!');
    } catch {
      showToast('Failed to copy — try again');
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Reset to sample data
  const resetData = () => {
    if (window.confirm('Reset your guest list to sample data? This will remove all current guests.')) {
      setGuests(guestListData.sampleGuests.map(g => ({ ...g, id: generateId() })));
      setSelectedIds(new Set());
      showToast('Guest list reset to sample data');
    }
  };

  // Loading skeleton
  if (!isLoaded) {
    return (
      <div className="space-y-4 max-w-6xl mx-auto animate-pulse" aria-label="Loading guest list">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#F3E8EA] p-4 h-20" />
          ))}
        </div>
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" />
      </div>
    );
  }

  // Sort icon helper
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortConfig.field !== field) return <ChevronDown size={12} className="text-slate-300" />;
    return sortConfig.direction === 'asc'
      ? <ChevronUp size={12} className="text-[#B76E79]" />
      : <ChevronDown size={12} className="text-[#B76E79]" />;
  };

  const selectStyles = "px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 transition-all bg-white";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ── Toast ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1A1A1A] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2"
          >
            <Check size={14} /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stats Dashboard ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={<Users size={18} />} label="Total Invited" value={stats.total} accent="#B76E79" />
        <StatCard icon={<Heart size={18} />} label="Accepted" value={stats.accepted} accent="#10B981" />
        <StatCard icon={<Clock size={18} />} label="Pending" value={stats.pending} accent="#F59E0B" />
        <StatCard icon={<Users size={18} />} label="Est. Headcount" value={stats.estimatedHeadcount} accent="#7B8EAF" />
      </div>

      {/* ── RSVP Progress & Capacity ── */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-bold text-[#1A1A1A]">RSVP Progress</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="venue-capacity" className="text-xs font-semibold text-slate-400 whitespace-nowrap">
              Venue Capacity:
            </label>
            <input
              id="venue-capacity"
              type="number"
              value={capacity}
              onChange={e => setCapacity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-2 py-1.5 rounded-lg border border-slate-200 text-sm font-bold text-center focus:outline-none focus:border-[#B76E79]"
              min={1}
            />
          </div>
        </div>
        <RSVPProgressBar stats={stats} />
        {stats.estimatedHeadcount > capacity && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold" role="alert">
            <AlertCircle size={14} />
            Estimated headcount ({stats.estimatedHeadcount}) exceeds venue capacity ({capacity})
          </div>
        )}
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-4 sm:p-5 shadow-sm space-y-4 print:hidden">
        {/* Search + Actions Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search guests by name, email, or notes..."
              value={filters.search}
              onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 transition-all"
              aria-label="Search guests"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(p => !p)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                showFilters || activeFilterCount > 0
                  ? 'bg-[#FCECF0] border-[#B76E79] text-[#B76E79]'
                  : 'border-slate-200 text-slate-500 hover:border-[#B76E79]'
              }`}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <Filter size={14} />
              Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
            </button>
            <button onClick={addGuest} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#B76E79] hover:bg-[#a25d66] text-white text-xs font-bold transition-colors shadow-sm" aria-label="Add new guest">
              <UserPlus size={14} /> Add Guest
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              id="filter-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
                <select
                  value={filters.rsvpStatus}
                  onChange={e => setFilters(prev => ({ ...prev, rsvpStatus: e.target.value }))}
                  className={selectStyles}
                  aria-label="Filter by RSVP status"
                >
                  <option value="">All RSVP Statuses</option>
                  {rsvpStatuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <select
                  value={filters.category}
                  onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className={selectStyles}
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <select
                  value={filters.mealPreference}
                  onChange={e => setFilters(prev => ({ ...prev, mealPreference: e.target.value }))}
                  className={selectStyles}
                  aria-label="Filter by meal preference"
                >
                  <option value="">All Meals</option>
                  {mealOptions.filter(m => m.id !== 'none').map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
                <select
                  value={filters.seatingGroup}
                  onChange={e => setFilters(prev => ({ ...prev, seatingGroup: e.target.value }))}
                  className={selectStyles}
                  aria-label="Filter by seating group"
                >
                  <option value="">All Tables</option>
                  {seatingGroups.map(sg => <option key={sg} value={sg}>{sg}</option>)}
                </select>
              </div>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="mt-2 text-xs text-[#B76E79] font-semibold hover:underline flex items-center gap-1">
                  <X size={12} /> Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors" aria-label="Export CSV">
            <Download size={13} /> Export CSV
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors" aria-label="Import CSV">
            <Upload size={13} /> Import CSV
          </button>
          <input ref={fileInputRef} type="file" accept=".csv" onChange={importCSV} className="hidden" aria-hidden="true" />
          <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors" aria-label="Print guest list">
            <Printer size={13} /> Print
          </button>
          <button onClick={copySummary} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors" aria-label="Copy summary">
            <Copy size={13} /> Copy Summary
          </button>
          <button onClick={resetData} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-400 text-xs font-semibold hover:bg-red-50 hover:text-red-500 transition-colors ml-auto" aria-label="Reset to sample data">
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* ── Bulk Actions (when selected) ── */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#FCECF0] rounded-2xl px-4 py-3 flex items-center justify-between print:hidden"
          >
            <span className="text-sm font-semibold text-[#B76E79]">
              {selectedIds.size} guest{selectedIds.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <select
                onChange={e => {
                  const val = e.target.value;
                  if (!val) return;
                  setGuests(prev =>
                    prev.map(g => selectedIds.has(g.id) ? { ...g, rsvpStatus: val } : g)
                  );
                  showToast(`RSVP updated for ${selectedIds.size} guest(s)`);
                  e.target.value = '';
                }}
                className="px-2 py-1.5 rounded-lg border border-[#B76E79]/30 text-xs font-medium bg-white focus:outline-none"
                aria-label="Bulk change RSVP status"
              >
                <option value="">Set RSVP...</option>
                {rsvpStatuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <button
                onClick={deleteSelected}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors"
                aria-label="Delete selected guests"
              >
                <Trash2 size={12} /> Delete
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="px-3 py-1.5 rounded-lg bg-white text-slate-500 text-xs font-semibold hover:bg-slate-50 transition-colors"
                aria-label="Clear selection"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Guest List ── */}
      {filteredGuests.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-12 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FCECF0] flex items-center justify-center">
            <Users size={28} className="text-[#B76E79]" />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A1A]">
            {guests.length === 0 ? 'Your guest list is empty' : 'No guests match your filters'}
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {guests.length === 0
              ? 'Start building your wedding guest list by adding your first guest, or import guests from a CSV file.'
              : 'Try adjusting your search or filters to find the guests you are looking for.'}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            {guests.length === 0 ? (
              <>
                <button onClick={addGuest} className="flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-[#B76E79] hover:bg-[#a25d66] text-white text-sm font-bold transition-colors shadow-md">
                  <UserPlus size={16} /> Add First Guest
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-5 py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
                  <Upload size={16} /> Import CSV
                </button>
              </>
            ) : (
              <button onClick={clearFilters} className="flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-[#B76E79] hover:bg-[#a25d66] text-white text-sm font-bold transition-colors">
                <X size={16} /> Clear Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-3xl border border-[#F3E8EA] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="grid">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-[#F3E8EA]">
                    <th className="w-10 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === filteredGuests.length && filteredGuests.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded accent-[#B76E79]"
                        aria-label="Select all guests"
                      />
                    </th>
                    {([
                      ['name', 'Guest Name'],
                      ['category', 'Category'],
                      ['rsvpStatus', 'RSVP'],
                      ['mealPreference', 'Meal'],
                      ['seatingGroup', 'Table'],
                    ] as [SortField, string][]).map(([field, label]) => (
                      <th key={field} className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort(field)}
                          className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#B76E79] transition-colors"
                          aria-label={`Sort by ${label}`}
                        >
                          {label} <SortIcon field={field} />
                        </button>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">+1</th>
                    <th className="px-4 py-3 w-24" />
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredGuests.map(guest => (
                      <motion.tr
                        key={guest.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="border-b border-slate-50 hover:bg-[#FCECF0]/30 transition-colors group"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(guest.id)}
                            onChange={() => toggleSelect(guest.id)}
                            className="w-4 h-4 rounded accent-[#B76E79]"
                            aria-label={`Select ${guest.name}`}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold text-[#1A1A1A]">{guest.name || 'Unnamed'}</p>
                            {guest.email && <p className="text-[11px] text-slate-400">{guest.email}</p>}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold"
                            style={{
                              backgroundColor: `${getCategoryColor(guest.category)}15`,
                              color: getCategoryColor(guest.category)
                            }}
                          >
                            {getCategoryLabel(guest.category)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white"
                            style={{ backgroundColor: getRsvpColor(guest.rsvpStatus) }}
                          >
                            {getRsvpLabel(guest.rsvpStatus)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600">{getMealLabel(guest.mealPreference)}</td>
                        <td className="px-4 py-3 text-xs text-slate-600">{guest.seatingGroup}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {guest.plusOne ? (guest.plusOneName || 'Yes') : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setEditingGuest(guest)}
                              className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"
                              aria-label={`Edit ${guest.name}`}
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              onClick={() => deleteGuest(guest.id)}
                              className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                              aria-label={`Delete ${guest.name}`}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 text-xs text-slate-500">
                <input
                  type="checkbox"
                  checked={selectedIds.size === filteredGuests.length && filteredGuests.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded accent-[#B76E79]"
                />
                Select all ({filteredGuests.length})
              </label>
              <button onClick={() => handleSort(sortConfig.field)} className="text-xs text-[#B76E79] font-semibold flex items-center gap-1">
                Sort: {sortConfig.field} {sortConfig.direction === 'asc' ? '↑' : '↓'}
              </button>
            </div>
            <AnimatePresence mode="popLayout">
              {filteredGuests.map(guest => (
                <GuestCardMobile
                  key={guest.id}
                  guest={guest}
                  onEdit={() => setEditingGuest(guest)}
                  onDelete={() => deleteGuest(guest.id)}
                  isSelected={selectedIds.has(guest.id)}
                  onToggleSelect={() => toggleSelect(guest.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Result Count */}
          <p className="text-center text-xs text-slate-400 print:hidden">
            Showing {filteredGuests.length} of {guests.length} guest{guests.length !== 1 ? 's' : ''}
          </p>
        </>
      )}

      {/* ── Print-only Table ── */}
      <div className="hidden print:block">
        <h2 className="text-xl font-bold mb-4">Wedding Guest List</h2>
        <p className="text-sm text-slate-600 mb-4">
          Total: {stats.total} | Accepted: {stats.accepted} | Declined: {stats.declined} | Pending: {stats.pending} | Est. Headcount: {stats.estimatedHeadcount}
        </p>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-1 px-1">Name</th>
              <th className="text-left py-1 px-1">Category</th>
              <th className="text-left py-1 px-1">RSVP</th>
              <th className="text-left py-1 px-1">Meal</th>
              <th className="text-left py-1 px-1">Table</th>
              <th className="text-left py-1 px-1">+1</th>
              <th className="text-left py-1 px-1">Notes</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(g => (
              <tr key={g.id} className="border-b border-slate-200">
                <td className="py-1 px-1 font-medium">{g.name}</td>
                <td className="py-1 px-1">{getCategoryLabel(g.category)}</td>
                <td className="py-1 px-1">{getRsvpLabel(g.rsvpStatus)}</td>
                <td className="py-1 px-1">{getMealLabel(g.mealPreference)}</td>
                <td className="py-1 px-1">{g.seatingGroup}</td>
                <td className="py-1 px-1">{g.plusOne ? (g.plusOneName || 'Yes') : '—'}</td>
                <td className="py-1 px-1 text-slate-500">{g.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Edit Modal ── */}
      <AnimatePresence>
        {editingGuest && (
          <GuestEditModal
            guest={editingGuest}
            onSave={saveGuest}
            onCancel={() => setEditingGuest(null)}
            seatingGroups={seatingGroups}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
