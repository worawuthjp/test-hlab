import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductTranslation } from './entities/product-translation.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTranslation)
    private readonly translationRepository: Repository<ProductTranslation>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { translations } = createProductDto;

    const product = this.productRepository.create({
      translations,
    });

    return this.productRepository.save(product);
  }

  async searchProducts(searchProductDto: SearchProductDto) {
    const { query, language, page = 1, limit = 10 } = searchProductDto;

    const [products, totalResults] = await this.translationRepository.findAndCount({
      where: {
        language: language || 'en',
        name: Like(`%${query}%`),
      },
      relations: ['product'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      page,
      totalPages: Math.ceil(totalResults / limit),
      totalResults,
      products,
    };
  }
}
