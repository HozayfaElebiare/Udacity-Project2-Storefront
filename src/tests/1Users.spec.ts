import supertest from 'supertest'
import { userModel, User } from '../Models/users';
import app from '../server';
import jwt from 'jsonwebtoken'

const request = supertest(app)


const UserModel = new userModel()
const user: User = {
  userfullname: 'Mahmoud Elebiar',
  username: 'mahmoud',
  userpassword: 'Passw0rd',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyIiwidXNlcm5hbWUiOiJtYWhtb3VkIiwidXNlcnBhc3N3b3JkIjoiJDJiJDEwJFpZLkNqUUw0OEFkQ2lhM256ZWFySk9VdUV0a1M5ZGNtOThLVHMyNUNQWjdicWxPQms0VGZ1IiwidG9rZW4iOm51bGwsImlhdCI6MTY0NDkyNDEzMn0.RmExbcahid9rUHCqd9pvxWG9QcLaM3vZGm3kX7HcSi4'
}

describe("Users Model", () => {
  it('1. should have an Register method', () => {
    expect(UserModel.Register).toBeDefined();
  });

  it('2. should have a Login method', () => {
    expect(UserModel.Login).toBeDefined();
  });

  it('3. should have a CheckUsername method', () => {
    expect(UserModel.CheckUsername).toBeDefined();
  });

  // check funtion register
  it('4. Register method should add a user', async () => {
    const result = await UserModel.Register(user);
    expect(result.id).toEqual(1);
  });


});


describe("Users Endpoints", () => {


  // Check endpoint login with faild response
  it('5. api login with response false', async () => {
    const response = await request.post('/user/login')
    expect(response.status).toBe(401)
    expect(response.text).toContain('Error Authintication faild')
  })

  // check endpoint login with success response
  it('6. api login with response true', async () => {
    const response = await request.post('/user/login').send({ username: 'mahmoud', userpassword: 'Passw0rd', })
    expect((jwt.decode(JSON.parse(response.text).Token) as User).username).toBe('mahmoud')
  })


  // check endpoint Get All Users
  it('7. api Get All Users with response true', async () => {
    const response = await request.get('/user/').set('Authorization', 'Bearer ' + user.token)
    const username = JSON.parse(response.text)[0].username
    expect(username).toBe('mahmoud')
  })

  // check endpoint Get All Users
  it('8. api Get ONE Users with response true', async () => {
    const response = await request.get('/user/1').set('Authorization', 'Bearer ' + user.token)
    const username = JSON.parse(response.text) as User[]
    expect(username[0].userfullname).toBe(user.userfullname)
  })


});