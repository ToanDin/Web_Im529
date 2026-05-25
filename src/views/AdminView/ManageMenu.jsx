import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ManageMenu({
  menu,
  openMenuAdd,
  openMenuEdit,
  handleDeleteMenu
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  const getDisplayItems = () => {
    if (activeCategory === 'all') {
      const seen = new Set();
      const allItems = [];
      Object.keys(menu).forEach(cat => {
        menu[cat]?.forEach(item => {
          if (!seen.has(item.id)) {
            seen.add(item.id);
            allItems.push({ ...item, categoryName: cat });
          }
        });
      });
      return allItems;
    }
    return menu[activeCategory]?.map(item => ({ ...item, categoryName: activeCategory })) || [];
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Cocktail Database</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Create, Edit, and Delete menu entries</p>
        </div>

        <button
          onClick={() => openMenuAdd(activeCategory === 'all' ? 'signatures' : activeCategory)}
          className="px-5 py-3 bg-brand-purple hover:bg-brand-purple-light text-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 box-glow-purple shadow flex items-center gap-1.5 cursor-pointer"
        >
          <Plus size={14} />
          <span>Add New Cocktail</span>
        </button>
      </div>

      {/* Menu Category Pills */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 text-xs uppercase font-semibold tracking-wider transition-all duration-200 border rounded-full cursor-pointer ${activeCategory === 'all'
            ? 'bg-brand-purple/20 text-brand-purple-light border-brand-purple text-glow-purple font-bold'
            : 'bg-transparent text-gray-400 border-white/10 hover:text-white'
            }`}
        >
          All
        </button>
        {Object.keys(menu).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-xs uppercase font-semibold tracking-wider transition-all duration-200 border rounded-full cursor-pointer ${activeCategory === category
              ? 'bg-brand-purple/20 text-brand-purple-light border-brand-purple text-glow-purple font-bold'
              : 'bg-transparent text-gray-400 border-white/10 hover:text-white'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cocktail list grid in active category */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {getDisplayItems().map((item) => (
          <div key={item.id} className="bg-brand-charcoal/40 border border-white/5 rounded-lg overflow-hidden flex flex-col justify-between hover:border-white/10 transition-colors">
            <div className="h-40 relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover filter brightness-75" />
              {item.tag && (
                <span className="absolute top-3 left-3 text-[8px] uppercase tracking-wider font-bold bg-brand-purple px-2 py-0.5 rounded text-white border border-brand-purple-light">
                  {item.tag}
                </span>
              )}
              <span className="absolute top-3 right-3 text-sm font-serif font-bold text-white bg-brand-black/85 border border-white/10 px-2.5 py-0.5 rounded backdrop-blur">
                ${item.price}
              </span>
            </div>

            <div className="p-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                <h4 className="font-serif text-lg font-bold text-white leading-tight">{item.name}</h4>
                <p className="text-xs text-gray-400 line-clamp-3 font-light leading-relaxed">{item.description}</p>
              </div>

              <div className="flex gap-2 border-t border-white/5 pt-3">
                <button
                  onClick={() => openMenuEdit(item, item.categoryName)}
                  className="flex-1 py-2 bg-brand-charcoal hover:bg-brand-dark/40 border border-white/10 hover:border-brand-purple/40 text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Edit size={12} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteMenu(item.categoryName, item.id)}
                  className="px-3 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded transition-all duration-200 flex items-center justify-center cursor-pointer"
                  title="Delete cocktail"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
