import React from 'react';
import { Flame, MapPin, Clock, Phone, ChevronRight } from 'lucide-react';
import LogoIm529 from '../../assets/Image/LogoIm529.jpg';

export default function Hero({ hero }) {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[pulse_10s_infinite_alternate]"
        style={{
          backgroundImage: `url(${hero.backgroundImage || LogoIm529})`
        }}
      />
      {/* Modern Industrial overlay: dark vignetting and noise texture */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent" />
      <div className="absolute inset-0 bg-brand-black/50" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Subtle Label */}
        <div className="flex items-center gap-2 mb-4 bg-brand-purple/10 border border-brand-purple/30 px-3 py-1 rounded-full backdrop-blur-sm">
          <Flame size={14} className="text-brand-purple-light animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-brand-purple-light font-bold">Im 529 Lounge Experience</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-5xl md:text-8xl font-bold tracking-wider leading-tight mb-6">
          <span className="block text-white opacity-95">{hero.subtitle}</span>
          <span className="text-transparent bg-gradient-to-r from-brand-purple-light via-brand-purple to-brand-purple-dark bg-clip-text text-glow-purple">
            {hero.title}
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-base md:text-xl text-gray-400 font-light leading-relaxed mb-10 tracking-wide">
          {hero.description}
        </p>

        {/* Call to Actions with Purple Neon Accents */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          {/* Primary Action - Purple Glow */}
          <a
            href="#menu"
            className="px-8 py-4 bg-brand-purple hover:bg-brand-purple-light text-white font-semibold text-sm uppercase tracking-widest rounded transition-all duration-300 hover:scale-105 active:scale-95 box-glow-purple shadow-lg flex items-center justify-center gap-2"
          >
            <span>Explore Menu</span>
            <ChevronRight size={16} className="text-white" />
          </a>

          {/* Secondary Action - Minimalist purple border */}
          <a
            href="#contact"
            className="px-8 py-4 bg-brand-black hover:bg-brand-charcoal text-white font-semibold text-sm uppercase tracking-widest rounded border border-brand-purple hover:border-brand-purple-light transition-all duration-300 hover:scale-105 active:scale-95 box-glow-purple shadow-lg"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Floating details overlay on bottom */}
      <div className="absolute bottom-8 left-0 w-full hidden lg:block z-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between text-xs text-gray-500 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-brand-purple-light" />
            <span>D2 Street Thu Dau Mot Binh Duong</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-brand-purple-light" />
            <span>Mon - Sun: 7:00 PM - 3:00 AM</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-brand-purple-light" />
            <span>+84 92 614 61 61</span>
          </div>
        </div>
      </div>
    </section>
  );
}
