import { useState, useEffect } from 'react';

export const FALLBACK_CONTENT = {
  hero: {
    title: "IM 529",
    subtitle: "EXPERIENCE",
    description: "Where industrial raw steel meets the warmth of aged oak. Indulge in artisanal mixology, molecular chemistry, and signature craft cocktails within an upscale rustic sanctuary."
  },
  about: {
    title: "Upscale Refinement",
    subtitle: "Born from Raw Iron & Timber",
    description1: "Im 529 stands at the intersection of middle modern industrial design and upscale rustic lounge aesthetics. Drawing inspiration from premium venues, we have forged a multi-sensory cocktail lounge. Exposed metal structural beams, vintage distressed wood, leather upholstery, and custom iron forge elements are illuminated by ambient candle glow and electric neon highlights.",
    description2: "Our mixology philosophy centers on smoke, barrel, and chemistry. We pair rare artisanal spirits with house-made bitters, activated charcoal, lavender mist, and dry ice fog to create visually stunning and complex taste profiles.",
    spec1Name: "Cocktail Menu",
    spec1Value: "16+ Signature",
    spec2Name: "Rare Spirits",
    spec2Value: "80+ Curated",
    spec3Name: "Infusion Fuel",
    spec3Value: "Oak & Smoke"
  },
  experience: {
    pillar1Title: "Smoked & Wood-Fired",
    pillar1Desc: "Experience cocktails cold-smoked under cherry wood and oak. We infuse rich, rustic wood essence directly into our spirits for deep, complex aromatics.",
    pillar2Title: "Curated Artisanal Spirits",
    pillar2Desc: "With a collection of over 80 rare rums, single-malt gins, and small-batch select whiskeys, we custom-source spirits from across the globe to craft our signature bases.",
    pillar3Title: "Molecular Mixology",
    pillar3Desc: "Art meets chemistry. Enjoy visually stunning cocktails featuring liquid nitrogen fog, spherified lime caviar pearls, gold dust infusions, and color-changing elixirs."
  }
};

export function useContentModel() {
  const [pageContent, setPageContent] = useState(FALLBACK_CONTENT);
  const [editedContent, setEditedContent] = useState(FALLBACK_CONTENT);
  const [contentSaving, setContentSaving] = useState(false);
  const [contentSuccess, setContentSuccess] = useState(false);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setPageContent(data);
        setEditedContent(data);
      }
    } catch (err) {
      console.warn('Backend content fetch failed, using offline fallback copy.', err);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Sync edited content when primary page content loads
  useEffect(() => {
    if (pageContent) {
      setEditedContent(pageContent);
    }
  }, [pageContent]);

  const updateEditedContent = (section, field, value) => {
    setEditedContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const resetEditedContent = () => {
    setEditedContent(pageContent);
  };

  const saveContent = async (token) => {
    setContentSaving(true);
    setContentSuccess(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editedContent)
      });
      if (res.ok) {
        setPageContent(editedContent);
        setContentSuccess(true);
        setTimeout(() => setContentSuccess(false), 3000);
        return { success: true };
      } else {
        return { success: false, error: 'Failed to save page copy configurations.' };
      }
    } catch (err) {
      return { success: false, error: 'Error updating page copy.' };
    } finally {
      setContentSaving(false);
    }
  };

  return {
    pageContent,
    editedContent,
    contentSaving,
    contentSuccess,
    fetchContent,
    updateEditedContent,
    resetEditedContent,
    saveContent
  };
}
