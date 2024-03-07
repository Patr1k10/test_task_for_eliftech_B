import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItemEntity } from './cart.item.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  name?: string | null;

  @Column({ nullable: true })
  email?: string | null;

  @Column({ nullable: true })
  phone?: string | null;

  @Column({ nullable: true })
  address?: string | null;

  @OneToMany(() => CartItemEntity, (item) => item.cart)
  cartItems: CartItemEntity[];

  @Column()
  totalPrice: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
