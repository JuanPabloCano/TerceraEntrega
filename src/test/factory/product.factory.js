import { faker } from '@faker-js/faker';

faker.locale = 'es';

const generateProduct = () => ({
  timestamp: Date.now(),
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  code: faker.datatype.number(),
  picture: faker.image.image(),
  price: Number(faker.commerce.price()),
  stock: faker.datatype.number()
});

export default {
  generateProduct
};