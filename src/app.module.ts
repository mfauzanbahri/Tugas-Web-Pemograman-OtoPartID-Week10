import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SparepartModule } from './sparepart/sparepart.module';

@Module({
  imports: [PrismaModule, SparepartModule],
})
export class AppModule {}
