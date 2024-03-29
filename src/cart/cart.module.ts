import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugEntity } from '../drugs/entities/drug.entity';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart.item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrugEntity, CartEntity, CartItemEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
