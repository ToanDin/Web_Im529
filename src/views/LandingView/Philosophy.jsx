import React from 'react';
import { Flame, Wine, GlassWater, ChevronRight } from 'lucide-react';

export default function Philosophy({ experience }) {
  return (
    <section id="philosophy" className="py-24 bg-brand-dark border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-purple-light font-bold">The Experience</span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white">Three Pillars of Im 529</h2>
          <div className="h-[1px] w-24 bg-brand-purple mx-auto mt-4"></div>
          <p className="text-sm text-gray-400 font-light">Crafting the perfect modern industrial evening involves precise harmony between raw craftsmanship, select ingredients, and ambient lighting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-brand-charcoal/40 border border-white/5 p-8 rounded-lg hover:border-brand-purple/30 transition-all duration-300 group flex flex-col h-full hover:shadow-[0_4px_30px_rgba(155,37,194,0.03)]">
            <div className="w-12 h-12 bg-brand-purple/10 rounded flex items-center justify-center mb-6 border border-brand-purple/20 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 text-brand-purple-light">
              <Flame size={22} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-brand-purple-light transition-colors duration-200">
              {experience.pillar1Title}
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-6 flex-grow">
              {experience.pillar1Desc}
            </p>
            <a href="#menu" className="text-xs text-brand-purple-light uppercase tracking-wider font-semibold flex items-center gap-1 hover:text-white transition-colors duration-200">
              <span>View Smoked Cocktails</span>
              <ChevronRight size={14} />
            </a>
          </div>

          {/* Pillar 2 */}
          <div className="bg-brand-charcoal/40 border border-white/5 p-8 rounded-lg hover:border-brand-purple/30 transition-all duration-300 group flex flex-col h-full hover:shadow-[0_4px_30px_rgba(155,37,194,0.03)]">
            <div className="w-12 h-12 bg-brand-purple/10 rounded flex items-center justify-center mb-6 border border-brand-purple/20 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 text-brand-purple-light">
              <Wine size={22} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-brand-purple-light transition-colors duration-200">
              {experience.pillar2Title}
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-6 flex-grow">
              {experience.pillar2Desc}
            </p>
            <a href="#menu" className="text-xs text-brand-purple-light uppercase tracking-wider font-semibold flex items-center gap-1 hover:text-white transition-colors duration-200">
              <span>Discover Spirits</span>
              <ChevronRight size={14} />
            </a>
          </div>

          {/* Pillar 3 */}
          <div className="bg-brand-charcoal/40 border border-white/5 p-8 rounded-lg hover:border-brand-purple/30 transition-all duration-300 group flex flex-col h-full hover:shadow-[0_4px_30px_rgba(155,37,194,0.03)]">
            <div className="w-12 h-12 bg-brand-purple/10 rounded flex items-center justify-center mb-6 border border-brand-purple/20 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 text-brand-purple-light">
              <GlassWater size={22} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-brand-purple-light transition-colors duration-200">
              {experience.pillar3Title}
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-6 flex-grow">
              {experience.pillar3Desc}
            </p>
            <a href="#menu" className="text-xs text-brand-purple-light uppercase tracking-wider font-semibold flex items-center gap-1 hover:text-white transition-colors duration-200">
              <span>Explore Mixology</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
