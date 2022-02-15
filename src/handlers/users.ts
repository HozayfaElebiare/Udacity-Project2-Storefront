import { userModel, User } from '../Models/users'
import express, { Request, Response } from 'express'
import auth from '../middleware/auth';
const userRouter = express.Router();


const userModeler = new userModel;



const register = async (req: Request, res: Response) => {
    try {
        const user: User = { ...req.body } as User
        const isDublicated: boolean = await userModeler.CheckUsername(user.username)
        if (isDublicated == false) {
            // Stage 1 => Check if username exist 
            return res.json('Username is exist')
        }
        else {
            // Register
            const returner = await userModeler.Register(user)
            res.json(returner)
        }
    } catch (error) {
        res.status(500).json({ 'serverError': error })
    }


}


const login = async (req: Request, res: Response) => {
    try {
        const user: User = { ...req.body } as User
        var returner = await userModeler.Login(user)
        if (returner[0] === "true") {
            res.status(200).json({
                Status: true,
                Token: returner[1],
                UserID: returner[2],
                Note: returner[3]
            })
        } else {
            res.status(401).json(returner)
        }
    } catch (error) {
        res.status(500).json({ 'serverError': error })
    }

}


const GetAllUsers = async (req: Request, res: Response) => {
    try {
        const user: User = { ...req.body } as User
        var returner = await userModeler.GetAll()
        res.status(200).json(returner)
    } catch (error) {
        res.status(500).json({ 'serverError': error })
    }
}


const GetOneUser = async (req: Request, res: Response) => {
    try {
        const userid: number = parseInt(req.params.id)
        var returner = await userModeler.GetOneUser(userid)
        res.status(200).json(returner)
    } catch (error) {
        res.status(500).json({ 'serverError': error })
    }
}



userRouter.post('/user/register', register)
userRouter.post('/user/login', login)
userRouter.get('/user/', auth , GetAllUsers)
userRouter.get('/user/:id',auth , GetOneUser)


export default userRouter