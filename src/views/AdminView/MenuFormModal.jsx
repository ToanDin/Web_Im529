import React from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

export default function MenuFormModal({
  isMenuFormOpen,
  setIsMenuFormOpen,
  menuForm,
  setMenuForm,
  menuFormSubmitting,
  menuFormError,
  handleMenuSubmit,
  handleImageUpload,
  imageUploadingField
}) {
  if (!isMenuFormOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/90 backdrop-blur-md">
      <div className="bg-brand-charcoal border border-brand-purple/20 rounded-lg overflow-hidden max-w-lg w-full relative shadow-[0_0_50px_rgba(155,37,194,0.15)]">
        <button
          onClick={() => setIsMenuFormOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="p-6 border-b border-white/5 bg-brand-dark/40">
          <h3 className="font-serif text-xl font-bold text-white">
            {menuForm.id ? 'Edit Cocktail Profile' : 'Configure New Cocktail'}
          </h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Database CRUD record</p>
        </div>

        <form onSubmit={handleMenuSubmit} className="p-6 space-y-4">
          {menuFormError && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 rounded text-xs text-red-400 flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{menuFormError}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Cocktail Name</label>
              <input
                type="text"
                required
                value={menuForm.name}
                onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
                placeholder="e.g., Midnight Violet"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Price ($ USD)</label>
              <input
                type="text"
                required
                value={menuForm.price}
                onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
                placeholder="e.g., 20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Category</label>
              <select
                value={menuForm.category}
                onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none cursor-pointer"
              >
                <option value="">All</option>
                <option value="signatures">Signatures</option>
                <option value="smoked">Smoked</option>
                <option value="molecular">Molecular</option>
                <option value="classics">Classics</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Tag (Optional)</label>
              <input
                type="text"
                value={menuForm.tag}
                onChange={(e) => setMenuForm({ ...menuForm, tag: e.target.value })}
                className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
                placeholder="e.g., Trending, Strong"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">Cocktail Image</label>
            <div className="flex gap-4 items-center">
              {menuForm.image && (
                <img
                  src={menuForm.image}
                  alt="Cocktail Preview"
                  className="w-12 h-12 rounded object-cover border border-brand-purple/40 shrink-0"
                />
              )}
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={menuForm.image || ''}
                  onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                  className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
                  placeholder="Or enter image URL: https://..."
                />
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-brand-charcoal hover:bg-brand-charcoal/80 border border-white/10 px-3 py-1.5 rounded text-[11px] font-bold text-gray-300 transition-colors uppercase tracking-wider inline-block">
                    {imageUploadingField === 'menuImage' ? 'Uploading...' : 'Choose from computer'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'menuImage', (url) => setMenuForm({ ...menuForm, image: url }))}
                      className="hidden"
                      disabled={imageUploadingField !== null}
                    />
                  </label>
                  {imageUploadingField === 'menuImage' && (
                    <span className="text-[10px] text-brand-purple-light uppercase tracking-wider animate-pulse font-medium">Uploading image...</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Flavor Notes / Ingredients Description</label>
            <textarea
              required
              rows={3}
              value={menuForm.description}
              onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
              placeholder="Describe the aromatics, spirits base, garnishes, and glassware details..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5 bg-brand-dark/30 -mx-6 -mb-6 p-6">
            <button
              type="button"
              onClick={() => setIsMenuFormOpen(false)}
              className="px-4 py-2 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-xs uppercase tracking-widest rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={menuFormSubmitting}
              className="px-5 py-2 bg-brand-purple hover:bg-brand-purple-light text-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 box-glow-purple shadow flex items-center gap-1 cursor-pointer"
            >
              {menuFormSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <CheckCircle size={12} />
                  <span>Commit Item</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
