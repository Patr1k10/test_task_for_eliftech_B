import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { DrugEntity } from './entities/drug.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedData } from '../types/interface';
import { paginate } from '../common/pagination';

@Injectable()
export class DrugsService {
  private readonly logger = new Logger(DrugsService.name);
  constructor(
    @InjectRepository(DrugEntity)
    private readonly drugRepository: Repository<DrugEntity>,
  ) {}
  async create(createDrugDto: CreateDrugDto) {
    const drug = this.drugRepository.create({ ...createDrugDto });
    return await this.drugRepository.save(drug);
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedData<DrugEntity>> {
    const queryBuilder = this.drugRepository.createQueryBuilder('Drug');
    return paginate<DrugEntity>(queryBuilder, +page, +limit);
  }

  async findOne(id: number) {
    const drug = this.drugRepository.findOne({ where: { id: id } });
    if (!drug) {
      throw new NotFoundException('drug is not found');
    }
    return drug;
  }

  async update(id: number, updateDrugDto: UpdateDrugDto) {
    const drug = this.drugRepository.findOne({ where: { id: id } });
    if (!drug) {
      throw new NotFoundException('shop is not found');
    }
    const updatedDrug = { ...drug, ...updateDrugDto };

    return this.drugRepository.save(updatedDrug);
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.drugRepository.softDelete(id);
    if (result.affected === 0) {
      this.logger.warn(`drug not found with ID: ${id}`);
      throw new NotFoundException(`drug with ID ${id} not found`);
    }
    this.logger.log(`Successfully soft-deleted drug with ID: ${id}`);
  }
}
