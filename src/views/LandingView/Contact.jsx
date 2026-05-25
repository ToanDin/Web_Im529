import React from 'react';
import { MapPin, Clock, Phone, CheckCircle, AlertCircle, Send } from 'lucide-react';

export default function Contact({
  contactForm,
  contactStatus,
  handleContactChange,
  handleContactSubmit
}) {
  return (
    <section id="contact" className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Contact Details Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-brand-purple"></span>
              <h2 className="text-xs uppercase tracking-widest text-brand-purple-light font-bold">Connect</h2>
            </div>
            <h3 className="font-serif text-3xl md:text-5xl font-semibold text-white leading-tight">
              Enter the Forge <br />
              <span className="text-gray-400 font-light italic">Leave a Message</span>
            </h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
              Have questions about private events, specific ingredient listings, or corporate cocktail bookings? Drop us an inbox inquiry.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-white/5">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded border border-brand-purple/20 bg-brand-charcoal flex items-center justify-center text-brand-purple-light shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-1">Our Location</h4>
                <p className="text-xs text-gray-400 font-light">529 Foundry Lane, Industrial District</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded border border-brand-purple/20 bg-brand-charcoal flex items-center justify-center text-brand-purple-light shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-1">Operating Hours</h4>
                <p className="text-xs text-gray-400 font-light">Mon - Sun: 4:00 PM - 12:00 AM</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded border border-brand-purple/20 bg-brand-charcoal flex items-center justify-center text-brand-purple-light shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-1">Direct Inquiries</h4>
                <p className="text-xs text-gray-400 font-light">+1 (529) 444-IRON</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-brand-charcoal/30 border border-white/5 p-8 rounded-lg backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />

            <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10">
              {contactStatus === 'success' && (
                <div className="p-4 bg-brand-purple/10 border border-brand-purple/40 text-brand-purple-light rounded text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle size={16} />
                  <span>Your cocktail message has been received! Our mixologists will follow up soon.</span>
                </div>
              )}

              {contactStatus === 'error' && (
                <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-400 rounded text-xs flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>Failed to submit. Please check your network connection and try again.</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    className="w-full bg-brand-dark/60 border border-white/5 focus:border-brand-purple/80 text-sm text-white px-4 py-3 rounded outline-none transition-all duration-200"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    className="w-full bg-brand-dark/60 border border-white/5 focus:border-brand-purple/80 text-sm text-white px-4 py-3 rounded outline-none transition-all duration-200"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Subject</label>
                <select
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  className="w-full bg-brand-dark/60 border border-white/5 focus:border-brand-purple/80 text-sm text-white px-4 py-3 rounded outline-none transition-all duration-200 cursor-pointer"
                >
                  <option value="General Inquiry">General Lounge Inquiry</option>
                  <option value="Table Booking Inquiry">Table Booking Details</option>
                  <option value="Private Event Hire">Private Foundry Hiring</option>
                  <option value="Other">Special Mixology Requests</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Your Message</label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  className="w-full bg-brand-dark/60 border border-white/5 focus:border-brand-purple/80 text-sm text-white px-4 py-3 rounded outline-none transition-all duration-200"
                  placeholder="Write details of your message..."
                />
              </div>

              <button
                type="submit"
                disabled={contactStatus === 'submitting'}
                className="w-full py-4 bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 hover:scale-105 active:scale-95 box-glow-purple shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {contactStatus === 'submitting' ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send size={12} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
