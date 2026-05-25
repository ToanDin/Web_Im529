import connection from '../config/database.js';
import { DEFAULT_MENU } from '../config/constants.js';

export const menuModel = {
  async initialize() {
    try {
      const [existing] = await connection.query('SELECT COUNT(*) AS count FROM cocktails');
      if (existing[0].count === 0) {
        console.log('>>> Seeding default menu into MySQL database...');
        const categoryMap = {
          signatures: 1,
          smoked: 2,
          molecular: 3,
          classics: 4
        };
        for (const [categoryName, items] of Object.entries(DEFAULT_MENU)) {
          const categoryId = categoryMap[categoryName];
          for (const item of items) {
            // Insert cocktail
            const [result] = await connection.query(
              'INSERT INTO cocktails (name, price, category_id, image_url, description) VALUES (?, ?, ?, ?, ?)',
              [item.name, item.price, categoryId, item.image, item.description]
            );
            const cocktailId = result.insertId;

            // Handle tag
            if (item.tag) {
              // Get or create tag
              let [tagRows] = await connection.query('SELECT id FROM tags WHERE name = ?', [item.tag]);
              let tagId;
              if (tagRows.length > 0) {
                tagId = tagRows[0].id;
              } else {
                const [tagResult] = await connection.query('INSERT INTO tags (name) VALUES (?)', [item.tag]);
                tagId = tagResult.insertId;
              }
              // Insert tag link
              await connection.query('INSERT INTO cocktail_tags (cocktail_id, tag_id) VALUES (?, ?)', [cocktailId, tagId]);
            }
          }
        }
        console.log('>>> Seeding menu completed successfully.');
      }
    } catch (err) {
      console.error('Error initializing/seeding menu database:', err);
    }
  },

  async get() {
    await this.initialize();
    try {
      const query = `
        SELECT c.id, c.name, c.price, c.image_url AS image, c.description, cat.name AS category, t.name AS tag
        FROM cocktails c
        LEFT JOIN categories cat ON c.category_id = cat.id
        LEFT JOIN cocktail_tags ct ON c.id = ct.cocktail_id
        LEFT JOIN tags t ON ct.tag_id = t.id
        ORDER BY c.id DESC
      `;
      const [rows] = await connection.query(query);
      
      const menu = {
        signatures: [],
        smoked: [],
        molecular: [],
        classics: []
      };

      for (const row of rows) {
        const cat = row.category;
        const item = {
          id: row.id,
          name: row.name,
          price: parseFloat(row.price),
          tag: row.tag || '',
          image: row.image || 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600',
          description: row.description || ''
        };

        if (!cat) {
          // If category is null/empty, show in all categories
          menu.signatures.push(item);
          menu.smoked.push(item);
          menu.molecular.push(item);
          menu.classics.push(item);
        } else if (menu[cat]) {
          menu[cat].push(item);
        }
      }
      return menu;
    } catch (err) {
      console.error('Error fetching menu from DB:', err);
      throw new Error('Failed to fetch menu from database.');
    }
  },

  async upsertItem(itemData) {
    const { id, name, description, price, tag, image, category } = itemData;
    const categoryMap = {
      signatures: 1,
      smoked: 2,
      molecular: 3,
      classics: 4
    };
    const categoryId = categoryMap[category] || 1;
    const priceNum = parseFloat(price);

    try {
      let cocktailId;
      if (id) {
        // Update existing cocktail
        await connection.query(
          'UPDATE cocktails SET name = ?, price = ?, category_id = ?, image_url = ?, description = ? WHERE id = ?',
          [name, priceNum, categoryId, image, description, id]
        );
        cocktailId = id;
      } else {
        // Insert new cocktail
        const [result] = await connection.query(
          'INSERT INTO cocktails (name, price, category_id, image_url, description) VALUES (?, ?, ?, ?, ?)',
          [name, priceNum, categoryId, image, description]
        );
        cocktailId = result.insertId;
      }

      // Handle tag update
      // 1. Clear old tag associations
      await connection.query('DELETE FROM cocktail_tags WHERE cocktail_id = ?', [cocktailId]);

      // 2. Link new tag if supplied
      if (tag && tag.trim()) {
        const trimmedTag = tag.trim();
        let [tagRows] = await connection.query('SELECT id FROM tags WHERE name = ?', [trimmedTag]);
        let tagId;
        if (tagRows.length > 0) {
          tagId = tagRows[0].id;
        } else {
          const [tagResult] = await connection.query('INSERT INTO tags (name) VALUES (?)', [trimmedTag]);
          tagId = tagResult.insertId;
        }
        await connection.query('INSERT INTO cocktail_tags (cocktail_id, tag_id) VALUES (?, ?)', [cocktailId, tagId]);
      }

      return await this.get();
    } catch (err) {
      console.error('Error upserting cocktail in DB:', err);
      throw new Error('Failed to save cocktail to database.');
    }
  },

  async deleteItem(category, id) {
    try {
      // 1. Delete associated tags links
      await connection.query('DELETE FROM cocktail_tags WHERE cocktail_id = ?', [id]);
      
      // 2. Delete cocktail entry
      await connection.query('DELETE FROM cocktails WHERE id = ?', [id]);

      return await this.get();
    } catch (err) {
      console.error('Error deleting cocktail from DB:', err);
      throw new Error('Failed to delete cocktail from database.');
    }
  }
};
