import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
  { nama: 'Kampas Rem Depan', merek: 'Nissin', kategori: 'Rem', kendaraan: 'Honda Beat 2020', harga: 45000, toko: 'Toko Motor Jaya', stok: 25 },
  { nama: 'Kampas Rem Depan', merek: 'Nissin', kategori: 'Rem', kendaraan: 'Honda Beat 2020', harga: 42000, toko: 'Bengkel Maju', stok: 10 },
  { nama: 'Kampas Rem Depan', merek: 'Nissin', kategori: 'Rem', kendaraan: 'Honda Beat 2020', harga: 48000, toko: 'Sparepart Online ID', stok: 40 },
  { nama: 'Oli Mesin 0.8L', merek: 'Yamalube', kategori: 'Oli', kendaraan: 'Yamaha NMAX', harga: 55000, toko: 'Toko Motor Jaya', stok: 60 },
  { nama: 'Oli Mesin 0.8L', merek: 'Yamalube', kategori: 'Oli', kendaraan: 'Yamaha NMAX', harga: 52000, toko: 'Sparepart Online ID', stok: 80 },
  { nama: 'Busi Iridium', merek: 'NGK', kategori: 'Kelistrikan', kendaraan: 'Suzuki Satria FU', harga: 85000, toko: 'Bengkel Maju', stok: 15 },
  { nama: 'Filter Udara', merek: 'Honda Genuine', kategori: 'Filter', kendaraan: 'Honda Vario 125', harga: 38000, toko: 'Toko Motor Jaya', stok: 30 },
  { nama: 'Rantai Motor 428H', merek: 'DID', kategori: 'Transmisi', kendaraan: 'Yamaha Vixion', harga: 180000, toko: 'Sparepart Online ID', stok: 12 },
  { nama: 'Aki Kering 12V 5Ah', merek: 'GS Astra', kategori: 'Kelistrikan', kendaraan: 'Honda Beat 2020', harga: 165000, toko: 'Bengkel Maju', stok: 8 },
  { nama: 'Ban Luar 80/90-14', merek: 'IRC', kategori: 'Ban', kendaraan: 'Honda Beat 2020', harga: 145000, toko: 'Toko Motor Jaya', stok: 20 },
];

async function main() {
  await prisma.sparepart.deleteMany();
  await prisma.sparepart.createMany({ data });
  console.log(`Seed selesai: ${data.length} data sparepart`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
