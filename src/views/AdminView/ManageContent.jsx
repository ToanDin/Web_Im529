import React from 'react';
import { Check, CheckCircle } from 'lucide-react';

export default function ManageContent({
  editedContent,
  handleEditedContentChange,
  handleImageUpload,
  imageUploadingField,
  contentSaving,
  contentSuccess,
  handleContentSave,
  resetEditedContent
}) {
  if (!editedContent) return null;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Manage Website Content</h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Update copy for Hero, About, and Pillars</p>
      </div>

      <form onSubmit={handleContentSave} className="space-y-8">
        {/* Hero Section Configs */}
        <div className="bg-brand-charcoal/40 border border-white/5 p-6 rounded-lg space-y-4">
          <h3 className="text-sm font-serif font-bold text-brand-purple-light uppercase tracking-widest border-b border-white/5 pb-2">Hero Section Banner</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Primary Title</label>
              <input
                type="text"
                value={editedContent.hero.title}
                onChange={(e) => handleEditedContentChange('hero', 'title', e.target.value)}
                className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2.5 rounded outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Subtitle Banner</label>
              <input
                type="text"
                value={editedContent.hero.subtitle}
                onChange={(e) => handleEditedContentChange('hero', 'subtitle', e.target.value)}
                className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2.5 rounded outline-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Hero Description</label>
            <textarea
              rows={3}
              value={editedContent.hero.description}
              onChange={(e) => handleEditedContentChange('hero', 'description', e.target.value)}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2.5 rounded outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">Hero Background Image</label>
            <div className="flex gap-4 items-center">
              {editedContent.hero.backgroundImage && (
                <img
                  src={editedContent.hero.backgroundImage}
                  alt="Hero Preview"
                  className="w-12 h-12 rounded object-cover border border-brand-purple/40 shrink-0"
                />
              )}
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={editedContent.hero.backgroundImage || ''}
                  onChange={(e) => handleEditedContentChange('hero', 'backgroundImage', e.target.value)}
                  className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
                  placeholder="Or enter image URL: https://..."
                />
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-brand-charcoal hover:bg-brand-charcoal/80 border border-white/10 px-3 py-1.5 rounded text-[11px] font-bold text-gray-300 transition-colors uppercase tracking-wider inline-block">
                    {imageUploadingField === 'heroBg' ? 'Uploading...' : 'Choose from computer'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'heroBg', (url) => handleEditedContentChange('hero', 'backgroundImage', url))}
                      className="hidden"
                      disabled={imageUploadingField !== null}
                    />
                  </label>
                  {imageUploadingField === 'heroBg' && (
                    <span className="text-[10px] text-brand-purple-light uppercase tracking-wider animate-pulse font-medium">Uploading image...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section Configs */}
        <div className="bg-brand-charcoal/40 border border-white/5 p-6 rounded-lg space-y-4">
          <h3 className="text-sm font-serif font-bold text-brand-purple-light uppercase tracking-widest border-b border-white/5 pb-2">About Section Concept</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Section Headline</label>
              <input
                type="text"
                value={editedContent.about.title}
                onChange={(e) => handleEditedContentChange('about', 'title', e.target.value)}
                className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2.5 rounded outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Sub Headline italic</label>
              <input
                type="text"
                value={editedContent.about.subtitle}
                onChange={(e) => handleEditedContentChange('about', 'subtitle', e.target.value)}
                className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2.5 rounded outline-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">About Paragraph 1</label>
            <textarea
              rows={4}
              value={editedContent.about.description1}
              onChange={(e) => handleEditedContentChange('about', 'description1', e.target.value)}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2.5 rounded outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">About Paragraph 2</label>
            <textarea
              rows={4}
              value={editedContent.about.description2}
              onChange={(e) => handleEditedContentChange('about', 'description2', e.target.value)}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2.5 rounded outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">About Section Image</label>
            <div className="flex gap-4 items-center">
              {editedContent.about.rightImage && (
                <img
                  src={editedContent.about.rightImage}
                  alt="About Preview"
                  className="w-12 h-12 rounded object-cover border border-brand-purple/40 shrink-0"
                />
              )}
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={editedContent.about.rightImage || ''}
                  onChange={(e) => handleEditedContentChange('about', 'rightImage', e.target.value)}
                  className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
                  placeholder="Or enter image URL: https://..."
                />
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-brand-charcoal hover:bg-brand-charcoal/80 border border-white/10 px-3 py-1.5 rounded text-[11px] font-bold text-gray-300 transition-colors uppercase tracking-wider inline-block">
                    {imageUploadingField === 'aboutImage' ? 'Uploading...' : 'Choose from computer'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'aboutImage', (url) => handleEditedContentChange('about', 'rightImage', url))}
                      className="hidden"
                      disabled={imageUploadingField !== null}
                    />
                  </label>
                  {imageUploadingField === 'aboutImage' && (
                    <span className="text-[10px] text-brand-purple-light uppercase tracking-wider animate-pulse font-medium">Uploading image...</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-3 bg-brand-dark/50 border border-white/5 rounded space-y-2">
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest">Spec 1 Label</label>
              <input
                type="text"
                value={editedContent.about.spec1Name}
                onChange={(e) => handleEditedContentChange('about', 'spec1Name', e.target.value)}
                className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-purple text-xs text-white px-2.5 py-1.5 rounded outline-none"
              />
              <input
                type="text"
                value={editedContent.about.spec1Value}
                onChange={(e) => handleEditedContentChange('about', 'spec1Value', e.target.value)}
                className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-purple text-xs text-white px-2.5 py-1.5 rounded outline-none font-bold"
              />
            </div>
            <div className="p-3 bg-brand-dark/50 border border-white/5 rounded space-y-2">
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest">Spec 2 Label</label>
              <input
                type="text"
                value={editedContent.about.spec2Name}
                onChange={(e) => handleEditedContentChange('about', 'spec2Name', e.target.value)}
                className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-purple text-xs text-white px-2.5 py-1.5 rounded outline-none"
              />
              <input
                type="text"
                value={editedContent.about.spec2Value}
                onChange={(e) => handleEditedContentChange('about', 'spec2Value', e.target.value)}
                className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-purple text-xs text-white px-2.5 py-1.5 rounded outline-none font-bold"
              />
            </div>
            <div className="p-3 bg-brand-dark/50 border border-white/5 rounded space-y-2">
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest">Spec 3 Label</label>
              <input
                type="text"
                value={editedContent.about.spec3Name}
                onChange={(e) => handleEditedContentChange('about', 'spec3Name', e.target.value)}
                className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-purple text-xs text-white px-2.5 py-1.5 rounded outline-none"
              />
              <input
                type="text"
                value={editedContent.about.spec3Value}
                onChange={(e) => handleEditedContentChange('about', 'spec3Value', e.target.value)}
                className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-purple text-xs text-white px-2.5 py-1.5 rounded outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Experience Pillars Configs */}
        <div className="bg-brand-charcoal/40 border border-white/5 p-6 rounded-lg space-y-4">
          <h3 className="text-sm font-serif font-bold text-brand-purple-light uppercase tracking-widest border-b border-white/5 pb-2">Experience Pillars (Philosophy)</h3>

          {/* Pillar 1 */}
          <div className="space-y-2 border-b border-white/5 pb-4">
            <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Pillar 1 Title</label>
            <input
              type="text"
              value={editedContent.experience.pillar1Title}
              onChange={(e) => handleEditedContentChange('experience', 'pillar1Title', e.target.value)}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2 rounded outline-none"
            />
            <label className="block text-xs text-gray-500 uppercase tracking-wider">Pillar 1 Description</label>
            <textarea
              rows={2}
              value={editedContent.experience.pillar1Desc}
              onChange={(e) => handleEditedContentChange('experience', 'pillar1Desc', e.target.value)}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
            />
          </div>

          {/* Pillar 2 */}
          <div className="space-y-2 border-b border-white/5 pb-4">
            <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Pillar 2 Title</label>
            <input
              type="text"
              value={editedContent.experience.pillar2Title}
              onChange={(e) => handleEditedContentChange('experience', 'pillar2Title', e.target.value)}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2 rounded outline-none"
            />
            <label className="block text-xs text-gray-500 uppercase tracking-wider">Pillar 2 Description</label>
            <textarea
              rows={2}
              value={editedContent.experience.pillar2Desc}
              onChange={(e) => handleEditedContentChange('experience', 'pillar2Desc', e.target.value)}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
            />
          </div>

          {/* Pillar 3 */}
          <div className="space-y-2">
            <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Pillar 3 Title</label>
            <input
              type="text"
              value={editedContent.experience.pillar3Title}
              onChange={(e) => handleEditedContentChange('experience', 'pillar3Title', e.target.value)}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-sm text-white px-3 py-2 rounded outline-none"
            />
            <label className="block text-xs text-gray-500 uppercase tracking-wider">Pillar 3 Description</label>
            <textarea
              rows={2}
              value={editedContent.experience.pillar3Desc}
              onChange={(e) => handleEditedContentChange('experience', 'pillar3Desc', e.target.value)}
              className="w-full bg-brand-dark border border-white/5 focus:border-brand-purple text-xs text-white px-3 py-2 rounded outline-none"
            />
          </div>
        </div>

        {/* Floating controls for saving */}
        <div className="flex justify-end gap-4 border-t border-white/5 pt-6">
          <button
            type="button"
            onClick={resetEditedContent}
            className="px-5 py-2.5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-xs uppercase tracking-widest rounded transition-all duration-300"
          >
            Reset Form
          </button>

          <button
            type="submit"
            disabled={contentSaving}
            className="px-6 py-2.5 bg-brand-purple hover:bg-brand-purple-light text-white text-xs uppercase tracking-widest rounded transition-all duration-300 font-bold box-glow-purple shadow flex items-center gap-1.5 cursor-pointer"
          >
            {contentSaving ? (
              <span>Saving Changes...</span>
            ) : contentSuccess ? (
              <>
                <Check size={14} />
                <span>Saved Successfully</span>
              </>
            ) : (
              <>
                <CheckCircle size={14} />
                <span>Save Copy Configuration</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
