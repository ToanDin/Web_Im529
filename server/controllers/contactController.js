import { contactModel } from '../models/contactModel.js';

export const createContact = (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    contactModel.add({ name, email, subject, message });

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
};

export const getContacts = (req, res) => {
  try {
    const contacts = contactModel.getAll();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch customer messages.' });
  }
};

export const deleteContact = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Message ID is required.' });
    }
    contactModel.delete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete customer message.' });
  }
};
