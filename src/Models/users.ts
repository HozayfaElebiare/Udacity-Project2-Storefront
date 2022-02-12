import client from "../Services/database";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
// import bcrypt from 'bcrypt'
dotenv.config()

export type User = {
  id?: number;
  userfullname: string;
  username: string;
  userpassword: string;
  token?: string;
}

export class userModel {

  public async Register(user: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users (userfullname, username, userpassword) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn
        .query(sql, [user.userfullname, user.username, user.userpassword])
      const addedUser = result.rows[0]
      conn.release()

      return addedUser
    } catch (err) {
      throw new Error(`Could not add new book ${user.userfullname}. Error: ${err}`)
    }
  }


  public async Login(user: User): Promise<string> {
    try {
      const sql = 'select * from users where username= $1 and userpassword= $2'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn
        .query(sql, [user.username, user.userpassword])
      const addedUser = result.rows[0]
      conn.release()
      const token = jwt.sign(addedUser, process.env.SecretKey as string)
      return token;
    } catch (err) {
      return 'Authintication faild, no users exist'
    }

  }



  public async CheckUsername(username: string): Promise<boolean> {
    try {
      const sql = 'select * from users where username= $1'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, username)
      const exist = result.rows.length
      console.log(result.rows)
      conn.release()
      if (exist == 0) {
        return true;
      } else {
        return false;

      }
    } catch (err) {
      return false
    }

  }


}