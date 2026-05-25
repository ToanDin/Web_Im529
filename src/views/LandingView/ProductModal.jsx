import React from 'react';
import { X, ChevronRight } from 'lucide-react';

export default function ProductModal({ selectedProduct, setSelectedProduct, fillContactInquiry }) {
  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-brand-charcoal border border-brand-purple/20 rounded-lg overflow-hidden max-w-lg w-full relative shadow-[0_0_50px_rgba(155,37,194,0.15)] flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-brand-black/75 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-brand-purple transition-all duration-300 cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Modal Image */}
        <div className="h-64 relative overflow-hidden">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover filter brightness-90"
          />
          {selectedProduct.tag && (
            <span className="absolute bottom-4 left-4 text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-brand-purple/95 text-white border border-brand-purple-light shadow-[0_0_10px_rgba(155,37,194,0.3)]">
              {selectedProduct.tag}
            </span>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-grow overflow-y-auto space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-serif text-2xl font-bold text-white leading-tight">
              {selectedProduct.name}
            </h3>
            <span className="font-serif text-2xl font-bold text-transparent bg-gradient-to-r from-brand-purple-light to-brand-purple bg-clip-text shrink-0">
              ${selectedProduct.price}
            </span>
          </div>

          <div className="w-12 h-[1px] bg-brand-purple"></div>

          <div className="space-y-4">
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              {selectedProduct.description}
            </p>
            <div className="p-4 bg-brand-dark/40 border border-white/5 rounded text-xs text-gray-400 font-light space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-500 uppercase tracking-wider">Cuisine Style</span>
                <span className="text-white font-medium">Modern Mixology / Upscale Lounge</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500 uppercase tracking-wider">Availability</span>
                <span className="text-brand-purple-light font-medium">House Signature Cocktail</span>
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-brand-dark/30 border-t border-white/5 flex gap-4">
          <button
            onClick={() => setSelectedProduct(null)}
            className="flex-grow py-3 text-center text-xs font-semibold uppercase tracking-widest border border-white/10 hover:border-white/20 text-gray-400 hover:text-white rounded transition-all duration-300 cursor-pointer"
          >
            Close Details
          </button>
          <a
            href="#contact"
            onClick={() => {
              setSelectedProduct(null);
              fillContactInquiry(selectedProduct.name, selectedProduct.price);
            }}
            className="flex-grow py-3 text-center text-xs font-semibold uppercase tracking-widest bg-brand-purple text-white hover:bg-brand-purple-light rounded transition-all duration-300 box-glow-purple shadow-lg font-bold flex items-center justify-center gap-1 cursor-pointer"
          >
            Inquire Now <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
