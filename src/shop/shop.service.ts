import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { In, Repository } from 'typeorm';
import { ShopEntity } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugEntity } from '../drugs/entities/drug.entity';
import { PaginatedData } from '../types/interface';
import { paginate } from '../common/pagination';

@Injectable()
export class ShopService {
  private readonly logger: Logger = new Logger(ShopService.name);
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(DrugEntity)
    private readonly drugRepository: Repository<DrugEntity>,
  ) {}

  async create(createShopDto: CreateShopDto) {
    const existingShop = await this.shopRepository.findOne({ where: { name: createShopDto.name } });
    if (existingShop) {
      throw new ConflictException('Shop already exists');
    }
    const shop = this.shopRepository.create({ ...createShopDto });
    return await this.shopRepository.save(shop);
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedData<ShopEntity>> {
    const queryBuilder = this.shopRepository.createQueryBuilder('Shop');
    queryBuilder.leftJoinAndSelect('Shop.drugs', 'drugs');

    return paginate<ShopEntity>(queryBuilder, +page, +limit);
  }

  async findOne(id: number) {
    const shop = this.shopRepository.findOne({ where: { id: id }, relations: ['drugs'] });
    if (!shop) {
      throw new NotFoundException('shop is not found');
    }
    return shop;
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const shop = await this.shopRepository.findOne({ where: { id: id } });
    if (!shop) {
      throw new NotFoundException('shop is not found');
    }
    if (updateShopDto.drugsId) {
      const { drugsId } = updateShopDto;
      const drugs = await this.drugRepository.find({ where: { id: In(drugsId) } });
      if (drugs.length !== drugsId.length) {
        throw new NotFoundException('One or more drugs not found');
      }
      shop.drugs = drugs;
    }
    const updatedShop = { ...shop };
    return this.shopRepository.save(updatedShop);
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.shopRepository.softDelete(id);
    if (result.affected === 0) {
      this.logger.warn(`Shop not found with ID: ${id}`);
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
    this.logger.log(`Successfully soft-deleted Shop with ID: ${id}`);
  }
}
