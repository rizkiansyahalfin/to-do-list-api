const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'todolist_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.DB_SSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

// Test koneksi
pool.on('connect', () => {
  console.log('Terhubung ke database PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Error tidak terduga pada client idle', err);
  process.exit(-1);
});

module.exports = pool; 