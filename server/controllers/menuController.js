import { menuModel } from '../models/menuModel.js';

export const getMenu = async (req, res) => {
  try {
    const menu = await menuModel.get();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to read menu.' });
  }
};

export const saveMenuItem = async (req, res) => {
  try {
    const { id, name, description, price, tag, image, category } = req.body;
    if (!name || price === undefined || !category) {
      return res.status(400).json({ error: 'Name, Price and Category are required.' });
    }

    if (isNaN(parseFloat(price))) {
      return res.status(400).json({ error: 'Price must be a valid number.' });
    }

    const menu = await menuModel.upsertItem({ id, name, description, price, tag, image, category });
    res.json({ success: true, menu });
  } catch (err) {
    console.error('Menu save error:', err);
    res.status(500).json({ error: err.message || 'Failed to update menu item.' });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { category, id } = req.params;
    if (!category || !id) {
      return res.status(400).json({ error: 'Category and ID are required.' });
    }

    const menu = await menuModel.deleteItem(category, id);
    res.json({ success: true, menu });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete cocktail.' });
  }
};
