import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QuerySparepartDto {
  @IsOptional()
  @IsString()
  kategori?: string;

  @IsOptional()
  @IsString()
  merek?: string;

  @IsOptional()
  @IsString()
  q?: string; // cari berdasarkan nama

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minHarga?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxHarga?: number;
}
