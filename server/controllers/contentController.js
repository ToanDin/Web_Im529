import { contentModel } from '../models/contentModel.js';

export const getContent = (req, res) => {
  try {
    const content = contentModel.get();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to read page content.' });
  }
};

export const updateContent = (req, res) => {
  try {
    const { hero, about, experience } = req.body;
    if (!hero || !about || !experience) {
      return res.status(400).json({ error: 'Invalid content schema.' });
    }
    const updatedContent = contentModel.save({ hero, about, experience });
    res.json({ success: true, message: 'Content updated successfully', content: updatedContent });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update page content.' });
  }
};
