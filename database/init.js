const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  try {
    console.log('Menginisialisasi database...');
    
    // Baca file skema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Jalankan skema
    await pool.query(schema);
    
    console.log('Database berhasil diinisialisasi!');
    
    // Test koneksi dengan mengambil todo
    const result = await pool.query('SELECT COUNT(*) FROM todos');
    console.log(`Ditemukan ${result.rows[0].count} todo di database`);
    
  } catch (error) {
    console.error('Error menginisialisasi database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Jalankan jika file ini dieksekusi langsung
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase; 