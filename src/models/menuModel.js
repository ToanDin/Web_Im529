import { useState, useEffect } from 'react';

export const FALLBACK_MENU = {
  signatures: [
    { id: 's1', name: 'Purple Neon Elixir', description: 'Empress 1908 Gin, elderflower liqueur, fresh lemon juice, lavender-infused simple syrup, edible silver shimmer.', price: 18, tag: 'Trending', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600' },
    { id: 's2', name: 'The 529 Alchemy', description: 'Artisanal white rum, butterfly pea flower tea, fresh lime, mint, carbonated club soda, sugar cane stick.', price: 19, tag: 'Signature', image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=600' },
    { id: 's3', name: 'Gothic Rose Mezcal', description: 'Mezcal, muddled fresh lime, blood orange nectar, organic agave, black sea salt rim, rose petal garnish.', price: 17, tag: 'Exotic', image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=600' },
    { id: 's4', name: 'Copper Pot Mule', description: 'Small batch vodka, freshly pressed ginger juice, lime juice, spicy ginger beer, served in a heavy industrial copper mug.', price: 16, tag: 'Classic', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600' }
  ],
  smoked: [
    { id: 'sm1', name: 'The Smoked 529 Old Fashioned', description: 'Hand-selected single barrel bourbon, Angostura & orange bitters, orange peel, cold-smoked under cherry wood oak.', price: 22, tag: 'Signature', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600' },
    { id: 'sm2', name: 'Charcoal Crimson Sour', description: 'Bourbon whiskey, fresh lemon, activated charcoal powder, simple syrup, egg white foam, red wine float.', price: 20, tag: 'Popular', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600' },
    { id: 'sm3', name: 'Wood-Fired Negroni', description: 'Cedar wood smoked gin, Campari, sweet vermouth, charred orange peel slice.', price: 21, tag: 'Bold', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600' },
    { id: 'sm4', name: 'Peated Forge & Fire', description: 'Islay Single Malt Scotch, honey-ginger syrup, fresh lemon, atomized smoky single malt wash.', price: 23, tag: 'Intense', image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=600' }
  ],
  molecular: [
    { id: 'm1', name: 'Gold Dust Boulevardier', description: 'Campari, sweet vermouth, 12-year bourbon, gold leaf flakes, orange oils.', price: 21, tag: 'Luxurious', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600' },
    { id: 'm2', name: 'Spherical Gin Tonic', description: 'Premium dry gin, tonic reduction, spherified lime caviar pearls, rosemary sprig, elderflower mist.', price: 19, tag: 'Avant-Garde', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600' },
    { id: 'm3', name: 'Neon Nitro Cold Brew', description: 'Espresso vodka, coffee liqueur, fresh cold brew, nitrogen-charged cream float, cocoa nib dust.', price: 18, tag: 'Energizing', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=600' },
    { id: 'm4', name: 'Liquid Nitrogen Bramble', description: 'Muddled blackberries, gin, lemon juice, freeze-dried blackberry crumble, dry ice fog.', price: 22, tag: 'Visual', image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=600' }
  ],
  classics: [
    { id: 'c1', name: 'Amber Glow Manhattan', description: '100 proof rye whiskey, artisan sweet vermouth, orange bitters, brandied cherry.', price: 20, tag: 'Premium', image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?q=80&w=600' },
    { id: 'c2', name: '1915 Aviation', description: 'Gin, Maraschino liqueur, Crème de Violette, fresh lemon juice.', price: 18, tag: 'Vintage', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600' },
    { id: 'c3', name: 'Sazerac Classique', description: 'Rye whiskey, Peychaud\'s bitters, absinthe rinse, sugar cube, lemon twist.', price: 19, tag: 'Historic', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600' },
    { id: 'c4', name: 'Vesper Martini', description: 'Gin, vodka, Lillet Blanc, thin lemon peel, shaken over crushed ice.', price: 20, tag: 'Elegant', image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=600' }
  ]
};

export function useMenuModel() {
  const [menu, setMenu] = useState(FALLBACK_MENU);
  const [menuLoading, setMenuLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        setMenu(data);
      }
    } catch (err) {
      console.warn('Backend menu fetch failed, using offline fallback menu.', err);
    } finally {
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const saveMenuItem = async (menuForm, token) => {
    const res = await fetch('/api/admin/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(menuForm)
    });
    const data = await res.json();
    if (res.ok) {
      setMenu(data.menu);
      return { success: true };
    } else {
      return { success: false, error: data.error || 'Failed to submit cocktail configuration.' };
    }
  };

  const deleteMenuItem = async (category, id, token) => {
    const res = await fetch(`/api/admin/menu/${category}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (res.ok) {
      setMenu(data.menu);
      return { success: true };
    } else {
      return { success: false, error: data.error || 'Failed to delete cocktail.' };
    }
  };

  return {
    menu,
    menuLoading,
    fetchMenu,
    saveMenuItem,
    deleteMenuItem
  };
}
