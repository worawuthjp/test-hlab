import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from 'src/product/product.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return products based on the search query', async () => {
    const response = await request(app.getHttpServer()).get('/products/search?query=Test&language=en&page=1&limit=5');

    expect(response.status).toBe(200);
    expect(response.body.products).toBeDefined();
    expect(response.body.products.length).toBeGreaterThan(0);
  });
});
