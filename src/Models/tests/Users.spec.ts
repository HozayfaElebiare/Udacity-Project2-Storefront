import supertest from 'supertest'
import { userModel,User} from '../users';
import  app  from '../../server';
import jwt from 'jsonwebtoken'
import { parse } from 'dotenv';
const request = supertest(app)

const UserModel = new userModel()
const user:User =  {
    userfullname: 'Mahmoud Elebiar',
    username: 'mahmoud',
    userpassword: 'Passw0rd',
    token:''
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

  it('4. Register method should add a user', async () => {
    const result = await UserModel.Register(user);
    expect(result.id).toEqual(1);
  });

  it('5. api login with response false', async () => {
    const response = await request.post('/user/login')
    expect(response.status).toBe(401)
    expect(response.text).toContain('Error Authintication faild')
  })


  it('6. api login with response true', async () => {
  const response = await request.post('/user/login').send({username: 'mahmoud', userpassword: 'Passw0rd',})
    expect((jwt.decode(JSON.parse(response.text).Token) as User).username).toBe('mahmoud')
})

});