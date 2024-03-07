import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopEntity } from './entities/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugEntity } from '../drugs/entities/drug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity, DrugEntity])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
