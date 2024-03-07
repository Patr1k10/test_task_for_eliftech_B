import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cartService.softDelete(+id);
  }
}
