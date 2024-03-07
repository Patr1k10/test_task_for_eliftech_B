import { Module } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { DrugsController } from './drugs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugEntity } from './entities/drug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrugEntity])],
  controllers: [DrugsController],
  providers: [DrugsService],
})
export class DrugsModule {}
