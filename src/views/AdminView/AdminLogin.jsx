import React from 'react';
import { AlertCircle, Lock, Compass } from 'lucide-react';

export default function AdminLogin({
  loginUsername,
  setLoginUsername,
  loginPassword,
  setLoginPassword,
  loginError,
  loginSubmitting,
  handleAdminLogin,
  setIsAdminMode
}) {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-brand-black/80 border border-brand-purple/20 p-8 rounded-lg shadow-[0_0_50px_rgba(155,37,194,0.1)] backdrop-blur-md relative z-10">
        <div className="text-center mb-8">
          <span className="font-serif text-3xl font-bold tracking-widest text-transparent bg-gradient-to-r from-brand-purple-light via-brand-purple to-brand-purple-dark bg-clip-text text-glow-purple">
            IM 529
          </span>
          <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">Administration Control Center</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-6">
          {loginError && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 rounded text-xs text-red-400 flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs uppercase tracking-widest text-gray-400">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full bg-brand-charcoal border border-white/10 focus:border-brand-purple/80 text-sm text-white px-4 py-3 rounded outline-none transition-all duration-200"
                placeholder="Enter admin username"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs uppercase tracking-widest text-gray-400">Password</label>
            <input
              type="password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full bg-brand-charcoal border border-white/10 focus:border-brand-purple/80 text-sm text-white px-4 py-3 rounded outline-none transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loginSubmitting}
            className="w-full py-3 bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 shadow-md box-glow-purple flex items-center justify-center gap-2 cursor-pointer"
          >
            {loginSubmitting ? (
              <span>Verifying Session...</span>
            ) : (
              <>
                <Lock size={12} />
                <span>Authorize Access</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-col gap-3">
          <p className="text-[10px] text-gray-500 tracking-wider">
            Tip: Default username is <code className="text-brand-purple-light bg-brand-charcoal/50 px-1.5 py-0.5 rounded">admin</code> and password is <code className="text-brand-purple-light bg-brand-charcoal/50 px-1.5 py-0.5 rounded">im529admin</code>
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '';
              setIsAdminMode(false);
            }}
            className="text-xs text-gray-400 hover:text-brand-purple-light transition-colors uppercase tracking-widest font-semibold flex items-center justify-center gap-1"
          >
            <Compass size={12} />
            <span>Return to Landing Page</span>
          </a>
        </div>
      </div>
    </div>
  );
}
