const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Ambil semua todo
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: Daftar todo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       completed:
 *                         type: boolean
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 */
// GET /api/todos - Ambil semua todo
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.json({
      success: true,
      data: todos
    });
  } catch (error) {
    console.error('Error mengambil todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error internal server',
      error: error.message
    });
  }
});

// GET /api/todos/:id - Ambil todo berdasarkan id
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.getById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo tidak ditemukan'
      });
    }
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Error mengambil todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error internal server',
      error: error.message
    });
  }
});

// POST /api/todos - Buat todo baru
router.post('/', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Judul wajib diisi'
      });
    }

    const todo = await Todo.create(title, description, completed);
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Error membuat todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error internal server',
      error: error.message
    });
  }
});

// PUT /api/todos/:id - Update todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updates = { title, description, completed };
    
    const todo = await Todo.update(req.params.id, updates);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Error mengupdate todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error internal server',
      error: error.message
    });
  }
});

// PATCH /api/todos/:id/toggle - Toggle status selesai todo
router.patch('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.toggleComplete(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Error toggle todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error internal server',
      error: error.message
    });
  }
});

// DELETE /api/todos/:id - Hapus todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.delete(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      message: 'Todo berhasil dihapus',
      data: todo
    });
  } catch (error) {
    console.error('Error menghapus todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error internal server',
      error: error.message
    });
  }
});

module.exports = router; 