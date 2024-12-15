import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';

describe('ProductController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProductModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new product', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send({
        translations: [
          { language: 'en', name: 'Test Product', description: 'Test Description' },
          { language: 'fr', name: 'Produit Test', description: 'Description en français' },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.translations).toHaveLength(2);
  });

  afterAll(async () => {
    await app.close();
  });
});
