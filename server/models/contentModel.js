import fs from 'fs';
import { CONTENT_FILE, DEFAULT_CONTENT } from '../config/constants.js';

export const contentModel = {
  initialize() {
    if (!fs.existsSync(CONTENT_FILE)) {
      this.save(DEFAULT_CONTENT);
    }
  },

  get() {
    this.initialize();
    try {
      const data = fs.readFileSync(CONTENT_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to read content file:', err);
      throw new Error('Failed to read page content.');
    }
  },

  save(data) {
    try {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2));
      return data;
    } catch (err) {
      console.error('Failed to write content file:', err);
      throw new Error('Failed to save page content.');
    }
  }
};
