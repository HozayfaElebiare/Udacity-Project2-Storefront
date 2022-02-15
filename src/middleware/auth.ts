import { Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../Models/users'
dotenv.config()

const auth = (req: Request, res: any, next: NextFunction) => {

    try {
        const authorizationHeader: string = req.headers.authorization as string
        // const userID:number = parseInt(req.headers.userid as string) 
        const token = authorizationHeader.split(' ')[1]
        // const decoded:User = jwt.verify(token, process.env.SecretKey as string) as User
        jwt.verify(token, process.env.SecretKey as string) as User
        // if(decoded.id !== userID) {
        //     throw new Error('User id does not match!')
        // }
        next()
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

}


export default auth