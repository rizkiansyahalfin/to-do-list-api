const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', require('./routes/todos'));

// Endpoint pengecekan kesehatan
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server sedang berjalan',
    timestamp: new Date().toISOString()
  });
});

// Endpoint root
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Todo List API',
    version: '1.0.0',
    endpoints: {
      todos: '/api/todos',
      health: '/health'
    }
  });
});

// Handler 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route tidak ditemukan'
  });
});

// Handler error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error internal server'
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; 