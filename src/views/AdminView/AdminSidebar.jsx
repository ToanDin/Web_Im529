import React from 'react';
import { X, Settings, Wine, Mail, Compass, LogOut } from 'lucide-react';

export default function AdminSidebar({
  adminActiveTab,
  setAdminActiveTab,
  inboxMessagesCount,
  handleAdminLogout,
  setIsAdminMode
}) {
  return (
    <aside className="w-full lg:w-64 bg-brand-black border-b lg:border-b-0 lg:border-r border-brand-purple/20 flex flex-col shrink-0">
      {/* Logo Brand Panel */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="font-serif text-xl font-bold tracking-widest text-transparent bg-gradient-to-r from-brand-purple-light to-brand-purple bg-clip-text text-glow-purple">
            IM 529
          </span>
          <span className="text-[9px] bg-brand-purple/20 text-brand-purple-light px-1.5 py-0.5 rounded uppercase font-bold tracking-widest border border-brand-purple/30">
            Admin
          </span>
        </div>
        <button
          onClick={() => {
            window.location.hash = '';
            setIsAdminMode(false);
          }}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Sidebar Nav Buttons */}
      <nav className="p-4 flex-grow space-y-1">
        <button
          onClick={() => setAdminActiveTab('page')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm uppercase tracking-wider font-semibold transition-all duration-200 ${adminActiveTab === 'page'
            ? 'bg-brand-purple/15 text-brand-purple-light border-l-2 border-brand-purple font-bold'
            : 'text-gray-400 hover:text-white hover:bg-brand-charcoal/40'
            }`}
        >
          <Settings size={16} />
          <span>Manage Copy</span>
        </button>

        <button
          onClick={() => setAdminActiveTab('menu')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm uppercase tracking-wider font-semibold transition-all duration-200 ${adminActiveTab === 'menu'
            ? 'bg-brand-purple/15 text-brand-purple-light border-l-2 border-brand-purple font-bold'
            : 'text-gray-400 hover:text-white hover:bg-brand-charcoal/40'
            }`}
        >
          <Wine size={16} />
          <span>Cocktail Menu</span>
        </button>

        <button
          onClick={() => setAdminActiveTab('inbox')}
          className={`w-full flex items-center justify-between px-4 py-3 rounded text-sm uppercase tracking-wider font-semibold transition-all duration-200 ${adminActiveTab === 'inbox'
            ? 'bg-brand-purple/15 text-brand-purple-light border-l-2 border-brand-purple font-bold'
            : 'text-gray-400 hover:text-white hover:bg-brand-charcoal/40'
            }`}
        >
          <div className="flex items-center gap-3">
            <Mail size={16} />
            <span>Inbox</span>
          </div>
          {inboxMessagesCount > 0 && (
            <span className="bg-brand-purple text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
              {inboxMessagesCount}
            </span>
          )}
        </button>
      </nav>

      {/* Sidebar Footer Controls */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button
          onClick={() => {
            window.location.hash = '';
            setIsAdminMode(false);
          }}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded text-xs text-gray-400 hover:text-white hover:bg-brand-charcoal/40 uppercase tracking-widest font-semibold transition-colors duration-200"
        >
          <Compass size={14} />
          <span>Exit Console</span>
        </button>

        <button
          onClick={handleAdminLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 uppercase tracking-widest font-semibold transition-colors duration-200"
        >
          <LogOut size={14} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
