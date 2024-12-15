import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductTranslation } from './entities/product-translation.entity';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductTranslation]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
