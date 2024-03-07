import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugEntity } from '../drugs/entities/drug.entity';
import { In, Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { PaginatedData } from '../types/interface';
import { paginate } from '../common/pagination';
import { CartItemEntity } from './entities/cart.item.entity';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  constructor(
    @InjectRepository(DrugEntity)
    private readonly drugRepository: Repository<DrugEntity>,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}
  async create(createCartDto: CreateCartDto) {
    const { drugs, name, email, phone, address } = createCartDto;
    const drugsEntities = await Promise.all(
      Object.keys(drugs).map(async (drugId) => {
        const drug = await this.drugRepository.findOne({ where: { id: +drugId } });
        if (!drug) {
          throw new NotFoundException(`Drug with ID ${drugId} not found`);
        }
        this.logger.log(`Created drug with ID ${drugId}`)
        return drug;
      }),
    );
    const totalPrice = drugsEntities.reduce((acc, drug) => acc + drug.price * drugs[drug.id], 0);
    const cart = this.cartRepository.create({ name, email, phone, address, totalPrice });
    await this.cartRepository.save(cart);

    const cartItems = drugsEntities.map((drug) => {
      const cartItem = new CartItemEntity();
      cartItem.drug = drug;
      cartItem.cart = cart;
      cartItem.quantity = drugs[drug.id];
      return cartItem;
    });

    await this.cartItemRepository.save(cartItems);

    return cart;
  }

  async findOne(id: number) {
    const cart = this.cartRepository.findOne({ where: { id: id }, relations: ['drugs', 'cartItems'] });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.cartRepository.softDelete(id);
    if (result.affected === 0) {
      this.logger.warn(`cart not found with ID: ${id}`);
      throw new NotFoundException(`cart with ID ${id} not found`);
    }
    this.logger.log(`Successfully soft-deleted cart with ID: ${id}`);
  }
}
