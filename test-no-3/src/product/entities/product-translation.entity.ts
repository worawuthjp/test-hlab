import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_translations')
@Unique(['product', 'language'])
export class ProductTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Product, (product) => product.translations, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
