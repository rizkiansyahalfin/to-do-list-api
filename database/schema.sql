-- Buat tabel todos
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat index untuk performa yang lebih baik
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);

-- Buat fungsi untuk update timestamp updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Buat trigger untuk otomatis update updated_at
DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;
CREATE TRIGGER update_todos_updated_at
    BEFORE UPDATE ON todos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Masukkan data contoh
INSERT INTO todos (title, description, completed) VALUES
    ('Belajar Express.js', 'Mempelajari framework Express.js dan fitur-fiturnya', false),
    ('Setup PostgreSQL', 'Konfigurasi koneksi database PostgreSQL', true),
    ('Buat endpoint API', 'Implementasi RESTful API untuk manajemen todo', false),
    ('Tambah autentikasi', 'Implementasi autentikasi dan otorisasi user', false)
ON CONFLICT DO NOTHING; 