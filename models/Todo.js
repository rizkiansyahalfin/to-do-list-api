const pool = require('../config/database');

class Todo {
  // Ambil semua todo
  static async getAll() {
    try {
      const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Ambil todo berdasarkan id
  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Buat todo baru
  static async create(title, description = '', completed = false) {
    try {
      const result = await pool.query(
        'INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3) RETURNING *',
        [title, description, completed]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update todo
  static async update(id, updates) {
    try {
      const { title, description, completed } = updates;
      const result = await pool.query(
        'UPDATE todos SET title = COALESCE($1, title), description = COALESCE($2, description), completed = COALESCE($3, completed), updated_at = NOW() WHERE id = $4 RETURNING *',
        [title, description, completed, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Hapus todo
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Toggle status selesai todo
  static async toggleComplete(id) {
    try {
      const result = await pool.query(
        'UPDATE todos SET completed = NOT completed, updated_at = NOW() WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Todo; 