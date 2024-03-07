import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';

@Controller('drugs')
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @Post()
  async create(@Body() createDrugDto: CreateDrugDto) {
    return this.drugsService.create(createDrugDto);
  }

  @Get()
  async findAll() {
    return this.drugsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.drugsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDrugDto: UpdateDrugDto) {
    return this.drugsService.update(+id, updateDrugDto);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    return this.drugsService.softDelete(+id);
  }
}
