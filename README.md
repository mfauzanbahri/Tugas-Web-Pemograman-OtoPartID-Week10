# OtoPartID API

**OtoPartID** adalah aplikasi katalog dan pembanding harga sparepart kendaraan. Repo ini berisi backend REST API (NestJS) yang pada Tugas 10 dihubungkan ke database **PostgreSQL** memakai **Prisma ORM**, sehingga data tersimpan permanen (tidak lagi di array memori).

## Teknologi
NestJS 10 · Prisma 6 · PostgreSQL · class-validator

## Cara Menjalankan
1. Pastikan PostgreSQL lokal berjalan, lalu buat database:
   ```sql
   CREATE DATABASE otopartid;
   ```
2. Salin `.env.example` menjadi `.env`, lalu sesuaikan user dan password PostgreSQL.
3. Install dependensi dan jalankan migrasi awal:
   ```bash
   npm install
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
4. Jalankan server:
   ```bash
   npm run start:dev
   ```
   API aktif di `http://localhost:3000`.

## Model Prisma
`Sparepart` (tabel `spareparts`): `id`, `nama`, `merek`, `kategori`, `kendaraan`, `harga`, `toko`, `stok`, `deskripsi`, `createdAt`, `updatedAt`.

## Endpoint
| Method | URL | Keterangan |
|---|---|---|
| POST | `/spareparts` | Tambah sparepart |
| GET | `/spareparts` | Daftar sparepart (filter opsional: `kategori`, `merek`, `q`, `minHarga`, `maxHarga`) |
| GET | `/spareparts/:id` | Detail sparepart |
| PATCH | `/spareparts/:id` | Ubah sparepart |
| DELETE | `/spareparts/:id` | Hapus sparepart |
| GET | `/spareparts/compare?nama=...` | Bandingkan harga antar toko, urut termurah |
| GET | `/spareparts/stats` | Statistik: total, harga rata-rata/min/max, jumlah per kategori |

Contoh body `POST /spareparts`:
```json
{
  "nama": "Kampas Rem Belakang",
  "merek": "Nissin",
  "kategori": "Rem",
  "kendaraan": "Honda Beat 2020",
  "harga": 40000,
  "toko": "Toko Motor Jaya",
  "stok": 20
}
```

## Struktur
```
prisma/            schema.prisma, seed.ts, migrations/
src/prisma/        PrismaService + PrismaModule (global)
src/sparepart/     controller, service, dto
```

## Screenshot
Lihat folder `docs/screenshots/`:
1. Tabel `spareparts` terbentuk setelah migrasi
2. Hasil CRUD (POST, GET, PATCH, DELETE)
3. Data tetap ada setelah server di-restart
4. Endpoint `compare` dan `stats`
5. Tampilan mobile dan desktop
"# Tugas-Web-Pemograman-OtoPartID-Week10" 
