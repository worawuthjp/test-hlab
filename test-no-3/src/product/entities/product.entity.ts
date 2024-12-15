import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductTranslation } from './product-translation.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductTranslation, (translation) => translation.product, {
    cascade: true,
  })
  translations: ProductTranslation[];
}
