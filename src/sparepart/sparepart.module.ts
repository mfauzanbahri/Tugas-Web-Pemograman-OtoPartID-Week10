import { Module } from '@nestjs/common';
import { SparepartController } from './sparepart.controller';
import { SparepartService } from './sparepart.service';

@Module({
  controllers: [SparepartController],
  providers: [SparepartService],
})
export class SparepartModule {}
