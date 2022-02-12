import { userModel, User } from '../Models/users'
import express, { Request, Response } from 'express'
import auth from '../middleware/auth';
const userRouter = express.Router();


const userModeler = new userModel;



const register = async (req: Request, res: Response) => {

    const user: User = { ...req.body } as User
    const isDublicated : boolean = await userModeler.CheckUsername(user.username)
    if (isDublicated == false){
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
userRouter.get('/user/login',auth, (req,res)=>{
    res.json('hello')
})

export default userRouter