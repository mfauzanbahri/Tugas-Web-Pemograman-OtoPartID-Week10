import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateSparepartDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsNotEmpty()
  merek: string;

  @IsString()
  @IsNotEmpty()
  kategori: string;

  @IsString()
  @IsNotEmpty()
  kendaraan: string;

  @IsInt()
  @Min(0)
  harga: number;

  @IsString()
  @IsNotEmpty()
  toko: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stok?: number;

  @IsOptional()
  @IsString()
  deskripsi?: string;
}
