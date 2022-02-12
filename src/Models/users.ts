import client from "../Services/database";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

export type User = {
  id?: number;
  userfullname: string;
  username: string;
  userpassword: string;
  token?: string;
}
const SaltKey = process.env.PasswodSalt
const SaltRounds: number = parseInt(process.env.SaltRounds as string)

export class userModel {

  public async Register(user: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users (userfullname, username, userpassword) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const hashpassword = bcrypt.hashSync(user.userpassword, SaltRounds)
      const conn = await client.connect()
      const result = await conn
        .query(sql, [user.userfullname, user.username, hashpassword])
      const addedUser = result.rows[0]
      conn.release()

      return addedUser
    } catch (err) {
      throw new Error(`Could not add new User ${user.userfullname}. Error: ${err}`)
    }
  }


  public async Login(user: User): Promise<string[]> {
    try {
      const sql = 'select * from users where username= $1'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [user.username])
      const SelectedUser = result.rows[0]
      conn.release()
      const same =  bcrypt.compareSync(user.userpassword, SelectedUser.userpassword )
      if (same == true) {
        console.log('true')
        const token = jwt.sign(SelectedUser, process.env.SecretKey as string)
        return ["true",token,SelectedUser.id,"Fro successfull response Please add token to req.headers.authorization and add User.ID to req.headers.id per each upcoming requests."];
      } else {
        console.log('false')
        return ['Authintication faild, no users exist']
      }
      // return 'Authintication faild, no users exist'
    } catch (err) {
      return ['Error Authintication faild, no users exist' + err]
    }

  }



  public async CheckUsername(username: string): Promise<boolean> {
    try {
      const sql = 'select * from users where username= $1'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [username])
      const exist = result.rows.length
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