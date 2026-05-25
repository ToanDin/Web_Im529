import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Philosophy from './Philosophy';
import Menu from './Menu';
import Contact from './Contact';
import Footer from './Footer';
import ProductModal from './ProductModal';

export default function LandingPage({ pageContent, menu, menuLoading, appController }) {
  return (
    <div className="min-h-screen bg-brand-dark text-gray-200 font-sans selection:bg-brand-purple selection:text-white relative overflow-x-hidden">

      {/* Decorative Neon Blurs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 -right-64 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      {/* Sticky Navbar */}
      <Navbar
        scrolled={appController.scrolled}
        mobileMenuOpen={appController.mobileMenuOpen}
        setMobileMenuOpen={appController.setMobileMenuOpen}
      />

      {/* Full-Screen Hero */}
      <Hero hero={pageContent.hero} />

      {/* About Section */}
      <About about={pageContent.about} />

      {/* Philosophy Section */}
      <Philosophy experience={pageContent.experience} />

      {/* Menu Section */}
      <Menu
        menu={menu}
        menuLoading={menuLoading}
        setSelectedProduct={appController.setSelectedProduct}
      />

      {/* Contact Section */}
      <Contact
        contactForm={appController.contactForm}
        contactStatus={appController.contactStatus}
        handleContactChange={appController.handleContactChange}
        handleContactSubmit={appController.handleContactSubmit}
      />

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        selectedProduct={appController.selectedProduct}
        setSelectedProduct={appController.setSelectedProduct}
        fillContactInquiry={appController.fillContactInquiry}
      />

    </div>
  );
}
