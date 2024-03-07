import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DrugEntity } from '../../drugs/entities/drug.entity';
import { CartEntity } from './cart.entity';

@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItems)
  @JoinColumn()
  cart: CartEntity;

  @ManyToOne(() => DrugEntity)
  @JoinColumn()
  drug: DrugEntity;

  @Column()
  quantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
