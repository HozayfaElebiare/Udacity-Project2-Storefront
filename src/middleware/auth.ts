import { Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const auth = (req: Request, res: any, next: NextFunction) => {

    try {
        const authorizationHeader: string = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.SecretKey as string)
        next()
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

}


export default auth