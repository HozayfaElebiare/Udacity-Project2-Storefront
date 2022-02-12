import client from "../Services/database";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export type User = {
     id?: number;
     userfullname: string;
     username: string;
     userpassword: string;
     token?: string;
}

export class userModel {

 public async Register(user:User):Promise<string>  {
    const token = jwt.sign({id: user.id,userfullname: user.userfullname,username: user.username},process.env.SecretKey as string)
    return token;
  }

}