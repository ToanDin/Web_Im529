import React from 'react';
import { Compass } from 'lucide-react';

export default function About({ about }) {
  return (
    <section id="about" className="py-24 bg-brand-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Text Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-brand-purple"></span>
            <h2 className="text-xs uppercase tracking-widest text-brand-purple-light font-semibold">The Concept</h2>
          </div>

          <h3 className="font-serif text-3xl md:text-5xl font-semibold text-white leading-tight">
            {about.title} <br />
            <span className="text-gray-400 font-light italic">{about.subtitle}</span>
          </h3>

          <p className="text-gray-400 leading-relaxed font-light">
            {about.description1}
          </p>

          <p className="text-gray-400 leading-relaxed font-light">
            {about.description2}
          </p>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-brand-purple pl-4">
              <span className="block text-xs uppercase tracking-widest text-gray-500 font-medium">{about.spec1Name}</span>
              <span className="text-lg font-serif font-semibold text-white">{about.spec1Value}</span>
            </div>
            <div className="border-l-2 border-brand-purple-light pl-4">
              <span className="block text-xs uppercase tracking-widest text-gray-500 font-medium">{about.spec2Name}</span>
              <span className="text-lg font-serif font-semibold text-white">{about.spec2Value}</span>
            </div>
            <div className="border-l-2 border-brand-purple pl-4 col-span-2 md:col-span-1">
              <span className="block text-xs uppercase tracking-widest text-gray-500 font-medium">{about.spec3Name}</span>
              <span className="text-lg font-serif font-semibold text-white">{about.spec3Value}</span>
            </div>
          </div>
        </div>

        {/* Right Image/Design Column */}
        <div className="lg:col-span-5 relative">
          {/* Styled Picture Frame */}
          <div className="relative border border-white/5 p-3 rounded bg-brand-dark/40 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 to-transparent z-10 pointer-events-none" />
            <img
              src={about.rightImage || "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800"}
              alt="Im 529 Rustic Upscale Interior"
              className="w-full h-[450px] object-cover rounded filter brightness-75 group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay Accent Plate */}
            <div className="absolute bottom-6 left-6 z-20 bg-brand-black/95 border border-brand-purple/35 p-4 rounded backdrop-blur-md max-w-[240px] box-glow-purple">
              <p className="text-[10px] uppercase tracking-widest text-brand-purple-light font-bold mb-1">Our Location</p>
              <p className="text-xs text-white font-serif mb-2">The Historic Steel Foundry Quarter</p>
              <a
                href="#contact"
                className="text-[10px] text-brand-purple-light hover:text-white transition-colors duration-200 flex items-center gap-1 font-bold uppercase tracking-wider"
              >
                <span>View Map</span>
                <Compass size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
