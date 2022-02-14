import { Order,OrderModel,OrderProducts,Product} from '../orders';

const orderModel = new OrderModel()

describe("Users Model", () => {
  it('1. should have an ChaneOrderFromOpenToSubmit method', () => {
    expect(orderModel.ChaneOrderFromOpenToSubmit).toBeDefined();
  });

  it('2. should have a CheckIfOpenOrderExist method', () => {
    expect(orderModel.CheckIfOpenOrderExist).toBeDefined();
  });

  it('3. should have a GetOpenOrder method', () => {
    expect(orderModel.GetOpenOrder).toBeDefined();
  });

  it('4. should have a addToCurrntOrder method', () => {
    expect(orderModel.addToCurrntOrder).toBeDefined();
  });

  it('5. should have a create method', () => {
    expect(orderModel.create).toBeDefined();
  });

  it('6. should have a showAll method', () => {
    expect(orderModel.showAll).toBeDefined();
  });

  it('7. should have a showOrderDetails method', () => {
    expect(orderModel.showOrderDetails).toBeDefined();
  });


});