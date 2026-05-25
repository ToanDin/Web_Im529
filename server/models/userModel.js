import connection from '../config/database.js';

export const userModel = {
  async getAllUsers() {
    try {
      const [results] = await connection.query('SELECT * FROM Users');
      return results;
    } catch (err) {
      console.error('Error in userModel.getAllUsers:', err);
      throw err;
    }
  }
};
