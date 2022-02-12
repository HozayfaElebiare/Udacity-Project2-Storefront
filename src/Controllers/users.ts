import {userModel,User} from '../Models/users'
import express, { Request, Response } from 'express'

const userRouter = express.Router();


const userModeler = new userModel;



const getToken =async (req:Request, res:Response) =>{
    const user:User = {...req.body} as User
    const returner =await  userModeler.Register(user)
    res.json(returner)
    // res.status(200).json(returner)
}

userRouter.post('/user/register', getToken )

export default userRouter





// // const router = express.Router();


// const userModeler = new userModel;

// const userRoutes = (app: express.Application) => {
//     app.post('/user/register', getToken )
// }

// const getToken = async (req:Request, res:Response) =>{
//     const user:User = {...req.body} as User
//     const returner =await  userModeler.Register(user)
//     res.json(returner)
// }

