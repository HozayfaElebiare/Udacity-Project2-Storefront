import { ProductModel, Product } from '../Models/products';
import { userModel, User } from '../Models/users';
import supertest from 'supertest'
import app from '../server';

const request = supertest(app)

const productModel = new ProductModel()

const user: User = {
  userfullname: 'Mahmoud Elebiar',
  username: 'mahmoud',
  userpassword: 'Passw0rd',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyIiwidXNlcm5hbWUiOiJtYWhtb3VkIiwidXNlcnBhc3N3b3JkIjoiJDJiJDEwJFpZLkNqUUw0OEFkQ2lhM256ZWFySk9VdUV0a1M5ZGNtOThLVHMyNUNQWjdicWxPQms0VGZ1IiwidG9rZW4iOm51bGwsImlhdCI6MTY0NDkyNDEzMn0.RmExbcahid9rUHCqd9pvxWG9QcLaM3vZGm3kX7HcSi4'
}

const Product1: Product = {
  productname: "Product1",
  productprice: 50
}

const Product2: Product = {
  productname: "Product2",
  productprice: 100
}


describe("Products Model", () => {
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


describe("Products Endpoints", () => {


  // Check endpoint Create new product
  it('5. api create product 1', async () => {
    const response = await request.post('/product').set('Authorization', 'Bearer ' + user.token).send(Product1)
    expect(response.status).toBe(200)
    expect(response.text).toContain('Product1')
  })


  // Check endpoint Create new product
  it('6. api create product 2', async () => {
    const response = await request.post('/product').set('Authorization', 'Bearer ' + user.token).send(Product2)
    expect(response.status).toBe(200)
    expect(response.text).toContain('Product2')
  })


  // Check endpoint Get All (2 products)
  it('7. api Get 2 products', async () => {
    const response = await request.get('/product').set('Authorization', 'Bearer ' + user.token)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).length).toBe(2)
  })

  it('8. api edit product2 to product3',async ()=>{
    const response = await request.put('/product/2').set('Authorization', 'Bearer ' + user.token).send({id:2,productname: "Product3", productprice: 60})
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).productname).toBe("Product3")
  })


  it('9. api get product2  ',async ()=>{
    const response = await request.get('/product/2').set('Authorization', 'Bearer ' + user.token)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).productname).toBe("Product3")
  })

  it('10. api delete product1 ',async ()=>{
    const response = await request.delete('/product/2').set('Authorization', 'Bearer ' + user.token)
    expect(response.status).toBe(200)
    expect(response.text).toContain('product deleted: 2')
  })
  
  // Check endpoint Get All (1 product)
  it('11. api Get all as 1 products after delete', async () => {
    const response = await request.get('/product').set('Authorization', 'Bearer ' + user.token)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).length).toBe(1)
  })





});