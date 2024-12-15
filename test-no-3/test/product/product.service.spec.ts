import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: jest.fn(), // Mock save method
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should create a product with translations', async () => {
    const mockData = {
      translations: [
        { language: 'en', name: 'Test Product', description: 'Test Description' },
        { language: 'fr', name: 'Produit Test', description: 'Description en français' },
      ],
    };

    const result = await service.createProduct(mockData);
    expect(productRepository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
