// tests/products.test.js

const { mockDb, mockProductModel, mockProducts } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the entire db module to return our controlled mock
jest.mock('../db', () => mockDb);

beforeEach(() => {
  jest.clearAllMocks(); // Reset all mock call history
});

it('should list all products', async () => {
  const products = await list();

  expect(mockProductModel.find).toHaveBeenCalled();
  expect(products.length).toBe(2);
  expect(products[0].description).toBe('Product 1');
  expect(products[1].description).toBe('Product 2');
});

it('should get a product by id', async () => {
  const mockProduct = { _id: '1234', description: 'Product 1' };
  mockProductModel.findById.mockResolvedValue(mockProduct);

  const product = await get('1234');

  expect(mockProductModel.findById).toHaveBeenCalledWith('1234');
  expect(product.description).toBe('Product 1');
});

it('should delete a product by id', async () => {
  mockProductModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

  const result = await destroy('1234');

  expect(mockProductModel.deleteOne).toHaveBeenCalledWith({ _id: '1234' });
  expect(result.deletedCount).toBe(1);
});
