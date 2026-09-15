import React, { useState } from 'react';

interface CategoryItem {
  id: string;
  name: string;
  percentage: number;
  icon: string;
  description: string;
  notes: string;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'venue-catering', name: 'Venue & Catering', percentage: 48, icon: '🏰', description: 'Reception venue, ceremony fee, food menu & bar service', notes: 'Variable per guest + fixed site fee' },
  { id: 'photo-video', name: 'Photography & Videography', percentage: 14, icon: '📸', description: 'Full day coverage, albums & highlight video reels', notes: 'Fixed cost anchor vendor' },
  { id: 'attire-beauty', name: 'Attire, Hair & Makeup', percentage: 10, icon: '👗', description: 'Wedding dress, suit/tux, accessories, hair styling & bridal makeup', notes: 'Include alteration buffers' },
  { id: 'flowers-decor', name: 'Florals & Decorations', percentage: 9, icon: '💐', description: 'Bouquets, ceremony arch, centerpieces, lighting & linens', notes: 'Scales with table counts' },
  { id: 'music-entertainment', name: 'Music & Entertainment', percentage: 8, icon: '🎵', description: 'DJ, live band, sound systems & MC services', notes: 'Check sound curfew rules' },
  { id: 'stationery-cake', name: 'Stationery, Cake & Favors', percentage: 4, icon: '💌', description: 'Save-the-dates, invitations, wedding cake & guest gifts', notes: 'Scales with guest list' },
  { id: 'contingency-buffer', name: 'Contingency & Emergency Buffer', percentage: 7, icon: '🛡️', description: 'Unexpected vendor overtime, taxes, service fees & last-minute fixes', notes: 'Crucial safety cushion' }
];

const I18N_LABELS: Record<string, any> = {
  en: {
    totalBudget: 'Total Wedding Budget ($USD)',
    guestCount: 'Estimated Guest Count',
    costPerGuest: 'Estimated cost per guest:',
    perPerson: '/ person',
    categoryAllocations: '📊 Category Allocations',
    actualTracker: '📝 Estimated vs. Actual Tracker',
    copySummary: 'Copy Breakdown',
    copied: '✓ Copied!',
    target: 'Target',
    actual: 'Actual',
    remaining: 'Remaining',
    totalSpent: 'Total Logged',
    categories: {
      'venue-catering': 'Venue & Catering',
      'photo-video': 'Photography & Videography',
      'attire-beauty': 'Attire, Hair & Makeup',
      'flowers-decor': 'Florals & Decorations',
      'music-entertainment': 'Music & Entertainment',
      'stationery-cake': 'Stationery, Cake & Favors',
      'contingency-buffer': 'Contingency & Emergency Buffer'
    }
  },
  ur: {
    totalBudget: 'شادی کا کل بجٹ ($USD)',
    guestCount: 'متوقع مہمانوں کی تعداد',
    costPerGuest: 'فی مہمان متوقع لاگت:',
    perPerson: '/ فی کس',
    categoryAllocations: '📊 کیٹیگری کے مطابق تقسیم',
    actualTracker: '📝 متوقع بمقابلہ اصل اخراجات',
    copySummary: 'خلاصہ کاپی کریں',
    copied: '✓ کاپی ہو گیا!',
    target: 'ہدف',
    actual: 'اصل خرچ',
    remaining: 'باقی رقم',
    totalSpent: 'کل خرچ شدہ',
    categories: {
      'venue-catering': 'ہال اور کھانا (کیٹرنگ)',
      'photo-video': 'فوٹوگرافی اور ویڈیو گرافی',
      'attire-beauty': 'لباس، بال اور میک اپ',
      'flowers-decor': 'پھول اور سجاوٹ',
      'music-entertainment': 'موسیقی اور انٹرٹینمنٹ',
      'stationery-cake': 'کارڈز، کیک اور تحائف',
      'contingency-buffer': 'ہنگامی فنڈ اور اضافی اخراجات'
    }
  },
  hi: {
    totalBudget: 'कुल शादी का बजट ($USD)',
    guestCount: 'अनुमानित अतिथि संख्या',
    costPerGuest: 'प्रति अतिथि अनुमानित लागत:',
    perPerson: '/ व्यक्ति',
    categoryAllocations: '📊 श्रेणी अनुसार आवंटन',
    actualTracker: '📝 अनुमानित बनाम वास्तविक ट्रैकर',
    copySummary: 'विवरण कॉपी करें',
    copied: '✓ कॉपी हो गया!',
    target: 'लक्ष्य',
    actual: 'वास्तविक',
    remaining: 'शेष',
    totalSpent: 'कुल खर्च',
    categories: {
      'venue-catering': 'वेन्यू और कैटरिंग',
      'photo-video': 'फोटोग्राफी और वीडियोग्राफी',
      'attire-beauty': 'पोशाक, बाल और मेकअप',
      'flowers-decor': 'फूल और सजावट',
      'music-entertainment': 'संगीत और मनोरंजन',
      'stationery-cake': 'कार्ड, केक और उपहार',
      'contingency-buffer': 'आपातकालीन फंड और बफर'
    }
  },
  es: {
    totalBudget: 'Presupuesto Total de la Boda ($USD)',
    guestCount: 'Número Estimado de Invitados',
    costPerGuest: 'Costo estimado por invitado:',
    perPerson: '/ persona',
    categoryAllocations: '📊 Asignación por Categorías',
    actualTracker: '📝 Estimado vs. Real',
    copySummary: 'Copiar Desglose',
    copied: '✓ ¡Copiado!',
    target: 'Objetivo',
    actual: 'Real',
    remaining: 'Restante',
    totalSpent: 'Total Gastado',
    categories: {
      'venue-catering': 'Lugar y Banquete',
      'photo-video': 'Fotografía y Video',
      'attire-beauty': 'Vestimenta, Peluquería y Maquillaje',
      'flowers-decor': 'Flores y Decoración',
      'music-entertainment': 'Música y Animación',
      'stationery-cake': 'Invitaciones, Pastel y Recuerdos',
      'contingency-buffer': 'Fondo de Imprevistos'
    }
  },
  fr: {
    totalBudget: 'Budget Total du Mariage ($USD)',
    guestCount: 'Nombre d\'Invités Estimé',
    costPerGuest: 'Coût estimé par invité :',
    perPerson: '/ personne',
    categoryAllocations: '📊 Répartition par Catégorie',
    actualTracker: '📝 Estimé vs Réel',
    copySummary: 'Copier la Répartition',
    copied: '✓ Copié !',
    target: 'Objectif',
    actual: 'Réel',
    remaining: 'Restant',
    totalSpent: 'Total Dépensé',
    categories: {
      'venue-catering': 'Lieu & Traiteur',
      'photo-video': 'Photo & Vidéo',
      'attire-beauty': 'Tenues, Coiffure & Maquillage',
      'flowers-decor': 'Fleurs & Décoration',
      'music-entertainment': 'Musique & Animation',
      'stationery-cake': 'Faire-part, Gâteau & Cadeaux',
      'contingency-buffer': 'Imprévus & Réserve'
    }
  },
  de: {
    totalBudget: 'Gesamtbudget der Hochzeit ($USD)',
    guestCount: 'Geschätzte Gästeanzahl',
    costPerGuest: 'Geschätzte Kosten pro Gast:',
    perPerson: '/ Person',
    categoryAllocations: '📊 Aufteilung nach Kategorien',
    actualTracker: '📝 Geplant vs. Tatsächlich',
    copySummary: 'Aufteilung Kopieren',
    copied: '✓ Kopiert!',
    target: 'Ziel',
    actual: 'Tatsächlich',
    remaining: 'Verbleibend',
    totalSpent: 'Gesamtausgaben',
    categories: {
      'venue-catering': 'Location & Catering',
      'photo-video': 'Foto- & Videografie',
      'attire-beauty': 'Kleidung, Haare & Make-up',
      'flowers-decor': 'Blumen & Dekoration',
      'music-entertainment': 'Musik & Entertainment',
      'stationery-cake': 'Papeterie, Torte & Geschenke',
      'contingency-buffer': 'Puffer für Unvorhergesehenes'
    }
  },
  ar: {
    totalBudget: 'إجمالي ميزانية الزفاف ($USD)',
    guestCount: 'عدد الضيوف المتوقع',
    costPerGuest: 'التكلفة التقديرية لكل ضيف:',
    perPerson: '/ للشخص',
    categoryAllocations: '📊 التوزيع حسب الفئات',
    actualTracker: '📝 المتوقع مقابل الفعلي',
    copySummary: 'نسخ التفاصيل',
    copied: '✓ تم النسخ!',
    target: 'المستهدف',
    actual: 'الفعلي',
    remaining: 'المتبقي',
    totalSpent: 'إجمالي المنفق',
    categories: {
      'venue-catering': 'المكان والطعام',
      'photo-video': 'التصوير والفيديو',
      'attire-beauty': 'الأزياء والشعر والمكياج',
      'flowers-decor': 'الزهور والديكور',
      'music-entertainment': 'الموسيقى والترفيه',
      'stationery-cake': 'البطاقات والكعكة والتوزيعات',
      'contingency-buffer': 'صندوق الطوارئ والاحتياط'
    }
  }
};

export function BudgetCalculator({ lang }: { lang?: string } = {}) {
  const activeLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'en') || 'en';
  const t = I18N_LABELS[activeLang] || I18N_LABELS.en;

  const [totalBudget, setTotalBudget] = useState<number>(30000);
  const [guestCount, setGuestCount] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'standard' | 'tracker'>('standard');
  const [actualExpenses, setActualExpenses] = useState<{ [key: string]: number }>({});
  const [copied, setCopied] = useState<boolean>(false);

  const costPerGuest = guestCount > 0 ? Math.round(totalBudget / guestCount) : 0;

  const totalSpent = Object.values(actualExpenses).reduce((a, b) => a + (Number(b) || 0), 0);
  const remainingBudget = totalBudget - totalSpent;

  const handleActualChange = (id: string, val: string) => {
    const num = parseFloat(val) || 0;
    setActualExpenses(prev => ({
      ...prev,
      [id]: num
    }));
  };

  const copySummary = () => {
    const lines = [
      `Wedding Budget Summary`,
      `Total Budget: $${totalBudget.toLocaleString()}`,
      `Guest Count: ${guestCount} guests`,
      `Cost per Guest: $${costPerGuest.toLocaleString()}/guest`,
      `---------------------------------`,
      ...DEFAULT_CATEGORIES.map(cat => {
        const catName = t.categories?.[cat.id] || cat.name;
        const allocated = Math.round(totalBudget * (cat.percentage / 100));
        const actual = actualExpenses[cat.id] || 0;
        return `${catName} (${cat.percentage}%): Target $${allocated.toLocaleString()} ${actual > 0 ? `| Actual: $${actual.toLocaleString()}` : ''}`;
      }),
      `---------------------------------`,
      `Total Logged: $${totalSpent.toLocaleString()}`,
      `Remaining: $${remainingBudget.toLocaleString()}`
    ];

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };


  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F3E8EA] shadow-xl max-w-4xl mx-auto space-y-8">
      
      {/* Header & Key Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-[#FCECF0]/50 to-white p-6 rounded-2xl border border-[#F3E8EA]">
        {/* Total Budget Input */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#B76E79]">
            {t.totalBudget}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
            <input 
              type="number" 
              value={totalBudget || ''} 
              onChange={(e) => setTotalBudget(Math.max(0, Number(e.target.value)))}
              className="w-full text-2xl sm:text-3xl font-black pl-9 pr-4 py-3.5 bg-white border border-[#F3E8EA] rounded-2xl outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-[#B76E79] transition-all shadow-inner text-[#1A1A1A]"
              placeholder="30000"
            />
          </div>
          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] font-bold text-slate-400 self-center mr-1">Quick tiers:</span>
            {[10000, 20000, 30000, 50000, 75000].map(tier => (
              <button
                key={tier}
                type="button"
                onClick={() => setTotalBudget(tier)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                  totalBudget === tier
                    ? 'bg-[#B76E79] text-white border-[#B76E79] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#B76E79] hover:text-[#B76E79]'
                }`}
              >
                ${tier >= 1000 ? `${tier / 1000}k` : tier}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Count & Per-Guest KPI */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#B76E79]">
            {t.guestCount}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">👥</span>
            <input 
              type="number" 
              value={guestCount || ''} 
              onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value)))}
              className="w-full text-2xl sm:text-3xl font-black pl-11 pr-4 py-3.5 bg-white border border-[#F3E8EA] rounded-2xl outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-[#B76E79] transition-all shadow-inner text-[#1A1A1A]"
              placeholder="100"
            />
          </div>
          {/* KPI Indicator */}
          <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-xl border border-[#F3E8EA] text-xs">
            <span className="text-slate-500 font-medium">{t.costPerGuest}</span>
            <span className="font-extrabold text-[#B76E79] text-sm">${costPerGuest.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">{t.perPerson}</span></span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('standard')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'standard'
                ? 'bg-[#B76E79] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.categoryAllocations}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'tracker'
                ? 'bg-[#B76E79] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.actualTracker}
          </button>
        </div>

        <button
          type="button"
          onClick={copySummary}
          className="text-xs font-bold text-slate-600 hover:text-[#B76E79] flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#B76E79] transition-all"
        >
          {copied ? (
            <>
              <span className="text-emerald-600 font-bold">{t.copied}</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{t.copySummary}</span>
            </>
          )}
        </button>
      </div>

      {/* Tab 1: Standard Breakdown View */}
      {activeTab === 'standard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {DEFAULT_CATEGORIES.map(cat => {
              const allocated = Math.round(totalBudget * (cat.percentage / 100));
              const isBuffer = cat.id === 'contingency-buffer';
              const catName = t.categories?.[cat.id] || cat.name;
              return (
                <div 
                  key={cat.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isBuffer 
                      ? 'bg-gradient-to-r from-[#FCECF0] to-[#fff4f6] border-[#B76E79]/30' 
                      : 'bg-white border-[#F3E8EA] hover:border-[#B76E79]/40 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#1A1A1A]">{catName}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">{cat.percentage}% allocation</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-base sm:text-lg font-black ${isBuffer ? 'text-[#B76E79]' : 'text-[#1A1A1A]'}`}>
                        ${allocated.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">{cat.description}</p>
                </div>
              );
            })}
          </div>


          {/* Visual Distribution Bar */}
          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Budget Allocation Share</span>
              <span className="text-[#B76E79]">100% Allocated</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: '48%' }} className="bg-[#B76E79] h-full" title="Venue & Catering (48%)"></div>
              <div style={{ width: '14%' }} className="bg-[#a25d66] h-full" title="Photo & Video (14%)"></div>
              <div style={{ width: '10%' }} className="bg-[#d48e98] h-full" title="Attire & Beauty (10%)"></div>
              <div style={{ width: '9%' }} className="bg-[#D4AF37] h-full" title="Florals & Decor (9%)"></div>
              <div style={{ width: '8%' }} className="bg-[#8b5a61] h-full" title="Music & DJ (8%)"></div>
              <div style={{ width: '4%' }} className="bg-slate-400 h-full" title="Stationery & Cake (4%)"></div>
              <div style={{ width: '7%' }} className="bg-emerald-500 h-full" title="Contingency Buffer (7%)"></div>
            </div>
            <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 pt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#B76E79]"></span> Venue/Catering (48%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#a25d66]"></span> Photo/Video (14%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#d48e98]"></span> Attire/Beauty (10%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span> Florals/Decor (9%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#8b5a61]"></span> Music (8%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Stationery/Cake (4%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Emergency Buffer (7%)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Estimated vs Actual Tracker View */}
      {activeTab === 'tracker' && (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold text-[10px]">
                  <th className="py-2.5 px-3">Expense Category</th>
                  <th className="py-2.5 px-3 text-right">Target Budget</th>
                  <th className="py-2.5 px-3 text-right">Actual Spent ($)</th>
                  <th className="py-2.5 px-3 text-right">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DEFAULT_CATEGORIES.map(cat => {
                  const target = Math.round(totalBudget * (cat.percentage / 100));
                  const actual = actualExpenses[cat.id] || 0;
                  const diff = target - actual;
                  const hasSpent = actual > 0;
                  return (
                    <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-slate-600">
                        ${target.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <input
                          type="number"
                          placeholder="0"
                          value={actualExpenses[cat.id] !== undefined && actualExpenses[cat.id] !== 0 ? actualExpenses[cat.id] : ''}
                          onChange={(e) => handleActualChange(cat.id, e.target.value)}
                          className="w-24 text-right py-1 px-2 border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-[#B76E79]"
                        />
                      </td>
                      <td className="py-3 px-3 text-right font-bold">
                        {!hasSpent ? (
                          <span className="text-slate-400">—</span>
                        ) : diff >= 0 ? (
                          <span className="text-emerald-600 font-bold">+${diff.toLocaleString()} under</span>
                        ) : (
                          <span className="text-rose-600 font-bold">-${Math.abs(diff).toLocaleString()} over</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tracker Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Budget</span>
              <span className="text-lg font-black text-slate-800">${totalBudget.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Logged Spent</span>
              <span className="text-lg font-black text-[#B76E79]">${totalSpent.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Remaining Balance</span>
              <span className={`text-lg font-black ${remainingBudget >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                ${remainingBudget.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Pro Planning Footer Tip */}
      <div className="p-4 rounded-2xl bg-[#FCECF0]/60 border border-[#B76E79]/20 flex items-start gap-3 text-xs text-slate-700">
        <span className="text-base">💡</span>
        <p className="leading-relaxed">
          <strong className="text-[#1A1A1A]">Smart Budgeting Rule:</strong> Always leave your <strong>7–10% contingency fund</strong> untouched until 30 days prior to the wedding date to handle unforeseen delivery fees, last-minute tailoring, and weather backup rentals.
        </p>
      </div>

    </div>
  );
}
