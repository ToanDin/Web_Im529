import React, { useState } from 'react';

export default function Menu({ menu, menuLoading, setSelectedProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const getDisplayItems = () => {
    if (activeCategory === 'all') {
      const seen = new Set();
      const allItems = [];
      Object.keys(menu).forEach(cat => {
        menu[cat]?.forEach(item => {
          if (!seen.has(item.id)) {
            seen.add(item.id);
            allItems.push(item);
          }
        });
      });
      return allItems;
    }
    return menu[activeCategory] || [];
  };

  return (
    <section id="menu" className="py-24 bg-brand-charcoal relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-purple-light font-bold">Liquid Library</span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white">Curated Mixology Menu</h2>
          <div className="h-[1px] w-24 bg-brand-purple mx-auto mt-4"></div>
          <p className="text-sm text-gray-400 font-light">Explore our four distinct disciplines of premium, wood-smoked, and molecular cocktails.</p>
        </div>

        {/* Menu Categories Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 text-xs uppercase font-bold tracking-widest transition-all duration-300 border cursor-pointer ${activeCategory === 'all'
              ? 'bg-brand-purple/20 text-brand-purple-light border-brand-purple box-glow-purple text-glow-purple'
              : 'bg-brand-black/40 text-gray-400 border-white/5 hover:text-white hover:border-brand-purple/30'
              }`}
          >
            All
          </button>
          {Object.keys(menu).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-xs uppercase font-bold tracking-widest transition-all duration-300 border cursor-pointer ${activeCategory === category
                ? 'bg-brand-purple/20 text-brand-purple-light border-brand-purple box-glow-purple text-glow-purple'
                : 'bg-brand-black/40 text-gray-400 border-white/5 hover:text-white hover:border-brand-purple/30'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid: 4-Column Layout */}
        {menuLoading ? (
          <div className="text-center py-20 text-gray-500 uppercase tracking-widest text-sm font-semibold animate-pulse">
            Mixing the cocktail menu...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getDisplayItems().map((item) => (
              <div
                key={item.id}
                className="bg-brand-dark/65 border border-white/5 rounded overflow-hidden flex flex-col justify-between group hover:border-brand-purple/25 transition-all duration-300 shadow-md hover:shadow-[0_4px_30px_rgba(155,37,194,0.05)]"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.tag && (
                    <span className="absolute bottom-3 left-3 text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-purple/95 text-white border border-brand-purple-light shadow-sm">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-sm font-serif font-bold text-white bg-brand-black/80 border border-white/10 px-2 py-0.5 rounded backdrop-blur">
                    ${item.price}
                  </span>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-bold text-white tracking-wide group-hover:text-brand-purple-light transition-colors duration-200 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="w-full text-center py-2 border border-white/5 hover:border-brand-purple/40 text-[10px] text-gray-400 hover:text-white uppercase tracking-widest font-semibold rounded bg-brand-black/35 hover:bg-brand-purple/10 transition-all duration-200 cursor-pointer"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
