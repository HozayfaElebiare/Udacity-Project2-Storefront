import { Order, OrderModel, OrderProducts, Product } from '../Models/orders';
import { userModel, User } from '../Models/users';
import supertest from 'supertest'
import app from '../server';

const request = supertest(app)

const user: User = {
  userfullname: 'Mahmoud Elebiar',
  username: 'mahmoud',
  userpassword: 'Passw0rd',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyIiwidXNlcm5hbWUiOiJtYWhtb3VkIiwidXNlcnBhc3N3b3JkIjoiJDJiJDEwJFpZLkNqUUw0OEFkQ2lhM256ZWFySk9VdUV0a1M5ZGNtOThLVHMyNUNQWjdicWxPQms0VGZ1IiwidG9rZW4iOm51bGwsImlhdCI6MTY0NDkyNDEzMn0.RmExbcahid9rUHCqd9pvxWG9QcLaM3vZGm3kX7HcSi4'
}

const Product1: Product = {
  id: 1,
  productname: "Product1",
  productprice: 50
}


const orderModel = new OrderModel()

describe("Orders Model", () => {
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


describe("Orders Endpoints", () => {


  // Check endpoint Create new Cart
  it('8. api create new Cart', async () => {
    const response = await request.post('/order/new').set('Authorization', 'Bearer ' + user.token)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toEqual({ id: 1, orderstatus: 'open', userid: '1' })
  })


  // Check endpoint get all orders
  it('9. api get all orders', async () => {
    const response = await request.get('/showmyorders/').set('Authorization', 'Bearer ' + user.token)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toEqual([{ id: 1, orderstatus: 'open', userid: '1' }])
  })


  // Check endpoint add product 1 to current open cart
  it('10. api add product 1 to current open cart', async () => {
    const response = await request.post('/addtocart').set('Authorization', 'Bearer ' + user.token).send({ "quantity": 17, "orderid": 1, "productid": 1 })
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toEqual({ "id": 1, "quantity": 17, "orderid": "1", "productid": "1" })
  })


  // Check endpoint submit current open order
  it('11. api submit current open order', async () => {
    const response = await request.post('/supmitorder/1').set('Authorization', 'Bearer ' + user.token)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toEqual({ id: 1, orderstatus: 'Submited', userid: '1' })
  })


  // Check endpoint get order by id
  it('12. api get order by id', async () => {
    const response = await request.get('/orderdetails/1').set('Authorization', 'Bearer ' + user.token)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toEqual([{ "id": 1, "productname": "Product1", "productprice": 50, "quantity": 17, "orderid": "1", "productid": "1" }])
  })



















});