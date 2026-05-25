import React from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar({ scrolled, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'backdrop-blur-md bg-brand-black/90 border-b border-brand-purple/15 py-4 shadow-xl'
        : 'bg-transparent py-6 border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-bold tracking-widest text-transparent bg-gradient-to-r from-brand-purple-light via-brand-purple to-brand-purple-dark bg-clip-text text-glow-purple">
            IM 529
          </span>
          <span className="w-1.5 h-1.5 bg-brand-purple-light rounded-full group-hover:scale-150 transition-all duration-300"></span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium tracking-wider uppercase text-gray-400 hover:text-brand-purple-light transition-colors duration-200">About</a>
          <a href="#philosophy" className="text-sm font-medium tracking-wider uppercase text-gray-400 hover:text-brand-purple-light transition-colors duration-200">Experience</a>
          <a href="#menu" className="text-sm font-medium tracking-wider uppercase text-gray-400 hover:text-brand-purple-light transition-colors duration-200">Menu</a>
          <a href="#contact" className="text-sm font-medium tracking-wider uppercase text-gray-400 hover:text-brand-purple-light transition-colors duration-200">Contact</a>
        </div>

        {/* Booking Button (Desktop) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-semibold uppercase tracking-widest text-brand-purple-light rounded border border-brand-purple/30 hover:border-brand-purple bg-transparent hover:bg-brand-purple hover:text-white transition-all duration-300 py-2 px-4 shadow-[0_0_10px_rgba(155,37,194,0.05)] hover:shadow-[0_0_15px_rgba(155,37,194,0.2)]"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-400 hover:text-brand-purple focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-black/95 backdrop-blur-lg border-b border-brand-purple/10 py-6 px-6 flex flex-col gap-4 transition-all duration-300">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium tracking-widest uppercase text-gray-300 hover:text-brand-purple-light"
          >
            About
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium tracking-widest uppercase text-gray-300 hover:text-brand-purple-light"
          >
            Experience
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium tracking-widest uppercase text-gray-300 hover:text-brand-purple-light"
          >
            Menu
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium tracking-widest uppercase text-gray-300 hover:text-brand-purple-light"
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full py-3 text-center text-sm font-semibold uppercase tracking-widest bg-brand-purple text-white rounded"
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
