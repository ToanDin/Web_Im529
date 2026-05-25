import fs from 'fs';
import { CONTACTS_FILE } from '../config/constants.js';

export const contactModel = {
  initialize() {
    if (!fs.existsSync(CONTACTS_FILE)) {
      this.save([]);
    }
  },

  getAll() {
    this.initialize();
    try {
      const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to read contacts file:', err);
      throw new Error('Failed to fetch customer messages.');
    }
  },

  save(contacts) {
    try {
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
      return contacts;
    } catch (err) {
      console.error('Failed to write contacts file:', err);
      throw new Error('Failed to save customer messages.');
    }
  },

  add(contactData) {
    const { name, email, subject, message } = contactData;
    const contacts = this.getAll();

    const newContact = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString()
    };

    contacts.push(newContact);
    this.save(contacts);
    return newContact;
  },

  delete(id) {
    let contacts = this.getAll();
    contacts = contacts.filter(msg => msg.id !== id);
    this.save(contacts);
    return true;
  }
};
