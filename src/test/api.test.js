import supertest from 'supertest';
import { expect } from "chai";
import productFactory from './factory/product.factory.js';

let request;
let createdProduct;
const URI = 'http://localhost:8080';

describe('Test over RestFulL API', () => {
  before(() => {
    request = supertest(URI);
  });

  describe('POST /api/productos', () => {
    const productToCreate = productFactory.generateProduct();
    it('should return status 201', async () => {
      const response = await request.post('/api/productos').send(productToCreate);
      createdProduct = response.body;
      expect(response.status).to.eql(201);
    });

    it('Response should contain a timestamp, name, description, code, picture, price and stock', async () => {
      expect(createdProduct.response).to.keys('__v', '_id', 'timestamp', 'name', 'description', 'code', 'picture', 'price', 'stock');
    });

    it('Response should return created product', async () => {
      expect(createdProduct.response.name).to.eql(productToCreate.name);
      expect(createdProduct.response.description).to.eql(productToCreate.description);
      expect(createdProduct.response.price).to.eql(productToCreate.price);
    });
  });

  describe('GET /api/productos', () => {
    it('Should return status 200', async () => {
      const response = await request
        .get('/api/productos')
        .set({ createdProduct });
      expect(response.status).to.eql(200);
    });

    it('Response should contain a timestamp, name, description, code, picture, price and stock', async () => {
      expect(createdProduct.response).to.keys('__v', '_id', 'timestamp', 'name', 'description', 'code', 'picture', 'price', 'stock');
    });


    describe('GET 404', () => {
      it('Should return status 404', async () => {
        const response = await request.get('/test');
        expect(response.status).to.eql(404);
      });
    });
  });
});