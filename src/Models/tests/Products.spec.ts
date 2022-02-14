import { ProductModel,Product} from '../products';

const productModel = new ProductModel()

describe("Users Model", () => {
  it('1. should have an index method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('2. should have a show method', () => {
    expect(productModel.show).toBeDefined();
  });

  it('3. should have a create method', () => {
    expect(productModel.create).toBeDefined();
  });

  it('4. should have a update method', () => {
    expect(productModel.update).toBeDefined();
  });

  it('5. should have a delete method', () => {
    expect(productModel.delete).toBeDefined();
  });

});