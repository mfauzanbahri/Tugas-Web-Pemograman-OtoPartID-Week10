import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SparepartService } from './sparepart.service';
import { CreateSparepartDto } from './dto/create-sparepart.dto';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';
import { QuerySparepartDto } from './dto/query-sparepart.dto';

@Controller('spareparts')
export class SparepartController {
  constructor(private readonly sparepartService: SparepartService) {}

  @Post()
  create(@Body() dto: CreateSparepartDto) {
    return this.sparepartService.create(dto);
  }

  @Get()
  findAll(@Query() query: QuerySparepartDto) {
    return this.sparepartService.findAll(query);
  }

  // Route statis harus di atas ':id'
  @Get('stats')
  stats() {
    return this.sparepartService.stats();
  }

  @Get('compare')
  compare(@Query('nama') nama: string) {
    return this.sparepartService.compare(nama ?? '');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sparepartService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSparepartDto,
  ) {
    return this.sparepartService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sparepartService.remove(id);
  }
}
