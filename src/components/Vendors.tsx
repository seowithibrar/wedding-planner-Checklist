import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Search, 
  Filter, 
  Heart,
  CheckCircle2,
  ExternalLink,
  Phone,
  MessageCircle,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Vendor } from '../App';
import { cn } from '../lib/utils';
import { Modal } from './ui/Modal';
import { CURRENCY_SYMBOLS } from '../lib/constants';

interface VendorsProps {
  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
  currency: string;
}

function VendorCarousel({ images, name }: { images: string[], name: string }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <img 
        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800" 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
    );
  }

  return (
    <div className="relative w-full h-full group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          src={images[current]}
          alt={`${name} - ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { 
              e.preventDefault();
              e.stopPropagation(); 
              setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1)); 
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/40 z-10"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={(e) => { 
              e.preventDefault();
              e.stopPropagation(); 
              setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1)); 
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/40 z-10"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <div 
                key={idx}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all shadow-sm",
                  idx === current ? "bg-white w-4" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Vendors({ vendors, setVendors, currency }: VendorsProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Vendor>>({
    name: '',
    category: 'Venue',
    price: '',
    location: '',
    rating: 5.0,
    icon: '🏛️',
    booked: false,
    images: [],
    phone: '',
    email: ''
  });

  const categories = ['All', 'Venue', 'Catering', 'Photography', 'Decor', 'Music'];
  const symbol = CURRENCY_SYMBOLS[currency] || '₨';

  const deleteVendor = (id: number) => {
    if (confirm('Are you sure you want to remove this vendor?')) {
      setVendors(prev => prev.filter(v => v.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingVendor(null);
    setFormData({
      name: '',
      category: 'Venue',
      price: '',
      location: '',
      rating: 5.0,
      icon: '🏛️',
      booked: false,
      images: [],
      phone: '',
      email: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({ ...vendor });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingVendor) {
      setVendors(prev => prev.map(v => v.id === editingVendor.id ? { ...v, ...formData } as Vendor : v));
    } else {
      const newVendor: Vendor = {
        id: Date.now(),
        name: formData.name!,
        category: formData.category!,
        price: formData.price!,
        location: formData.location!,
        rating: formData.rating || 5.0,
        icon: formData.icon || '🏛️',
        booked: !!formData.booked,
        images: formData.images && formData.images.length > 0 
          ? formData.images 
          : ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'],
        phone: formData.phone,
        email: formData.email
      };
      setVendors(prev => [newVendor, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredVendors = vendors.filter(v => {
    const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                         v.location.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vendor Marketplace</h2>
          <p className="text-slate-500 text-sm">Discover and book premium services for your wedding.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-rose-500 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors"
        >
          <Plus size={18} />
          Add Vendor
        </button>
      </div>

      {/* Categories & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap",
                activeCategory === cat 
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-200" 
                  : "bg-white border border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-500"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search vendors..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-shadow"
          />
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            {/* Image Wrap */}
            <div className="relative h-48 overflow-hidden">
               <VendorCarousel images={vendor.images} name={vendor.name} />
               <div className="absolute top-4 left-4 z-10">
                 <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                   {vendor.category}
                 </span>
               </div>
               <div className="absolute top-4 right-4 flex gap-2">
                 <button 
                   onClick={() => openEditModal(vendor)}
                   className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors shadow-sm"
                 >
                   <Edit2 size={16} />
                 </button>
                 <button 
                   onClick={() => deleteVendor(vendor.id)}
                   className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm"
                 >
                   <Trash2 size={16} />
                 </button>
               </div>
               {vendor.booked && (
                 <div className="absolute inset-0 bg-rose-500/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                   <div className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                     <CheckCircle2 size={14} /> Booked
                   </div>
                 </div>
               )}
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-slate-900">{vendor.rating}</span>
                  <span className="text-xs text-slate-400 font-medium">(24 reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  <MapPin size={12} />
                  {vendor.location}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-500 transition-colors mb-1 truncate">{vendor.name}</h3>
              <p className="text-xs text-slate-500 font-medium mb-2 line-clamp-1">Starting from <span className="text-slate-900 font-bold">{vendor.price}</span></p>

              {(vendor.phone || vendor.email) && (
                <div className="flex flex-col gap-1 mb-4">
                  {vendor.phone && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone size={12} className="text-slate-400" />
                      {vendor.phone}
                    </div>
                  )}
                  {vendor.email && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
                      <ExternalLink size={12} className="text-slate-400" />
                      {vendor.email}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <button 
                  disabled={vendor.booked}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2",
                    vendor.booked 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                  )}
                >
                  <MessageCircle size={14} /> Contact
                </button>
                <button 
                  disabled={vendor.booked}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm",
                    vendor.booked
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  )}
                >
                  View Detail <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="p-20 text-center bg-white rounded-[32px] border border-slate-200">
          <p className="text-slate-500 font-medium">No vendors found in this category.</p>
        </div>
      )}

      {/* Vendor Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Vendor Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Grand Palace Hotel"
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
                {['Venue', 'Catering', 'Photography', 'Decor', 'Music', 'Transport', 'Attire'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Lahore"
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Price Range / Starting Price</label>
            <input
              type="text"
              required
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              placeholder={`e.g. ${symbol}150,000 - ${symbol}500,000`}
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Image URLs (One per line)</label>
            <textarea
              value={formData.images?.join('\n')}
              onChange={e => setFormData({ ...formData, images: e.target.value.split('\n').filter(url => url.trim() !== '') })}
              placeholder="https://images.unsplash.com/..."
              rows={3}
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +92 300 1234567"
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. vendor@example.com"
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
            <input
              type="checkbox"
              id="booked"
              checked={formData.booked}
              onChange={e => setFormData({ ...formData, booked: e.target.checked })}
              className="w-5 h-5 accent-rose-500 rounded border-slate-200"
            />
            <label htmlFor="booked" className="text-sm font-semibold text-slate-700 cursor-pointer">Mark as Booked</label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
            >
              {editingVendor ? 'Update Vendor' : 'Add Vendor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
