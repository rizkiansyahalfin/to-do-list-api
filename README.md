# Todo List API

API RESTful untuk mengelola daftar tugas yang dibangun dengan Express.js dan PostgreSQL.

## Fitur

- ✅ Operasi CRUD untuk item todo
- ✅ Integrasi database PostgreSQL
- ✅ Desain API RESTful
- ✅ Penanganan error dan validasi
- ✅ CORS diaktifkan
- ✅ Konfigurasi environment

## Prasyarat

- Node.js (v14 atau lebih tinggi)
- PostgreSQL (v12 atau lebih tinggi)
- npm atau yarn

## Instalasi

1. Clone repository atau navigasi ke direktori proyek
2. Install dependencies:
   ```bash
   npm install
   ```

3. Buat file `.env` di direktori root dengan konfigurasi database:
   ```env
   # Konfigurasi Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=todolist_db
   DB_USER=postgres
   DB_PASSWORD=password_anda

   # Konfigurasi Server
   PORT=3000
   NODE_ENV=development
   ```

4. Buat database PostgreSQL:
   ```sql
   CREATE DATABASE todolist_db;
   ```

5. Inisialisasi skema database:
   ```bash
   npm run init-db
   ```

## Menjalankan Aplikasi

### Mode Development
```bash
npm run dev
```

### Mode Production
```bash
npm start
```

Server akan berjalan di `http://localhost:3000` (atau port yang ditentukan di file `.env`).

## Endpoint API

### Todos

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/todos` | Ambil semua todo |
| GET | `/api/todos/:id` | Ambil todo berdasarkan ID |
| POST | `/api/todos` | Buat todo baru |
| PUT | `/api/todos/:id` | Update todo |
| PATCH | `/api/todos/:id/toggle` | Toggle status selesai todo |
| DELETE | `/api/todos/:id` | Hapus todo |

### Endpoint Lainnya

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/` | Informasi API |
| GET | `/health` | Pengecekan kesehatan server |

## Contoh Request/Response

### Membuat Todo
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Belajar Express.js",
  "description": "Mempelajari framework Express.js",
  "completed": false
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Belajar Express.js",
    "description": "Mempelajari framework Express.js",
    "completed": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Ambil Semua Todo
```bash
GET /api/todos
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Belajar Express.js",
      "description": "Mempelajari framework Express.js",
      "completed": false,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Toggle Status Selesai Todo
```bash
PATCH /api/todos/1/toggle
```

## Struktur Proyek

```
todolist/
├── app.js                 # File aplikasi utama
├── package.json           # Dependencies dan scripts
├── .env                   # Variabel environment (buat ini)
├── config/
│   └── database.js        # Konfigurasi database
├── models/
│   └── Todo.js           # Model Todo dengan operasi database
├── routes/
│   └── todos.js          # Route todo
├── database/
│   ├── schema.sql        # Skema database
│   └── init.js           # Script inisialisasi database
└── README.md             # File ini
```

## Penanganan Error

API mengembalikan response error yang konsisten:

```json
{
  "success": false,
  "message": "Deskripsi error",
  "error": "Pesan error detail (dalam development)"
}
```

## Development

### Script yang Tersedia

- `npm start` - Jalankan server production
- `npm run dev` - Jalankan server development dengan nodemon
- `npm run init-db` - Inisialisasi skema database

### Variabel Environment

- `DB_HOST` - Host PostgreSQL (default: localhost)
- `DB_PORT` - Port PostgreSQL (default: 5432)
- `DB_NAME` - Nama database (default: todolist_db)
- `DB_USER` - User database (default: postgres)
- `DB_PASSWORD` - Password database
- `PORT` - Port server (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Lisensi

ISC 