import { userModel, User } from '../Models/users'
import express, { Request, Response } from 'express'

const userRouter = express.Router();


const userModeler = new userModel;



const register = async (req: Request, res: Response) => {

    const user: User = { ...req.body } as User
    const isDublicated : boolean = await userModeler.CheckUsername(user.username)
    console.log(isDublicated)
    if (isDublicated == true){
    // Stage 1 => Check if username exist 
        return res.json('Username is exist')
    } 
    else {
        // Register
        const returner = await userModeler.Register(user)
        res.json(returner)
    }

}


const login = async (req: Request, res: Response) => {
    const user: User = { ...req.body } as User
    const returner = await userModeler.Login(user)
    res.json(returner)
}

userRouter.post('/user/register', register)
userRouter.post('/user/login', login)

export default userRouter