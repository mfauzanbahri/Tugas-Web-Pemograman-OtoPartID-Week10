import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSparepartDto } from './dto/create-sparepart.dto';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';
import { QuerySparepartDto } from './dto/query-sparepart.dto';

@Injectable()
export class SparepartService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSparepartDto) {
    return this.prisma.sparepart.create({ data: dto });
  }

  // READ (semua) + filter lanjutan memakai where
  findAll(query: QuerySparepartDto = {}) {
    const where: Prisma.SparepartWhereInput = {};

    if (query.kategori) {
      where.kategori = { equals: query.kategori, mode: 'insensitive' };
    }
    if (query.merek) {
      where.merek = { equals: query.merek, mode: 'insensitive' };
    }
    if (query.q) {
      where.nama = { contains: query.q, mode: 'insensitive' };
    }
    if (query.minHarga !== undefined || query.maxHarga !== undefined) {
      where.harga = { gte: query.minHarga, lte: query.maxHarga };
    }

    return this.prisma.sparepart.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  // READ (satu)
  async findOne(id: number) {
    const item = await this.prisma.sparepart.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Sparepart dengan id ${id} tidak ditemukan`);
    }
    return item;
  }

  async update(id: number, dto: UpdateSparepartDto) {
    await this.findOne(id);
    return this.prisma.sparepart.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.sparepart.delete({ where: { id } });
  }

  // Fitur pembanding harga: bandingkan penawaran dengan nama yang sama
  async compare(nama: string) {
    const data = await this.prisma.sparepart.findMany({
      where: { nama: { contains: nama, mode: 'insensitive' } },
      orderBy: { harga: 'asc' },
    });
    if (data.length === 0) {
      throw new NotFoundException(`Tidak ada penawaran untuk "${nama}"`);
    }
    return {
      nama,
      jumlahPenawaran: data.length,
      termurah: data[0],
      termahal: data[data.length - 1],
      selisihHarga: data[data.length - 1].harga - data[0].harga,
      data,
    };
  }

  // Statistik sederhana: count, agregat harga, count per kategori
  async stats() {
    const [total, agg, perKategori] = await Promise.all([
      this.prisma.sparepart.count(),
      this.prisma.sparepart.aggregate({
        _avg: { harga: true },
        _min: { harga: true },
        _max: { harga: true },
      }),
      this.prisma.sparepart.groupBy({
        by: ['kategori'],
        _count: { _all: true },
        orderBy: { kategori: 'asc' },
      }),
    ]);

    return {
      totalSparepart: total,
      hargaRataRata: Math.round(agg._avg.harga ?? 0),
      hargaTermurah: agg._min.harga,
      hargaTermahal: agg._max.harga,
      perKategori: perKategori.map((k) => ({
        kategori: k.kategori,
        jumlah: k._count._all,
      })),
    };
  }
}
