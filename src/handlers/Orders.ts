import { OrderModel, Product, Order, OrderProducts } from '../Models/orders'
import express, { Request, Response } from 'express'
import auth from '../middleware/auth';
const productRouter = express.Router();
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../Models/users'
dotenv.config()


const orderModel = new OrderModel;


const CreateNewOrder = async (req: Request, res: Response) => {

    try {
        const userid = await getIdFromToken(req)
        const noExist = await orderModel.CheckIfOpenOrderExist(userid)
        if (noExist == true) {
            return res.json(await orderModel.create({ orderstatus: 'open', userid: userid }))

        } else {
            return res.json(await orderModel.GetOpenOrder(userid))
        }

    } catch (error) {
        res.status(500).json({ 'serverError': error })
    }

}

const GetMyOrders = async (req: Request, res: Response) => {
    try {
        const userid = await getIdFromToken(req)
        return res.json(await orderModel.showAll(userid))

    } catch (error) {
        res.status(500).json({ 'serverError': error })
    }

}

const AddToCurrentOrders = async (req: Request, res: Response) => {
    try {
        const newItem: OrderProducts = { ...req.body }
        return res.json(await orderModel.addToCurrntOrder(newItem))

    } catch (error) {
        res.status(500).json({ 'serverError': error })
    }

}

const SubmitOrder = async (req: Request, res: Response) => {
    try {
        const orderid: number = parseInt(req.params.id)
        return res.json(await orderModel.ChaneOrderFromOpenToSubmit(orderid))

    } catch (error) {
        res.status(500).json({ 'serverError': error })
    }

}

const GetOrderDetails = async (req: Request, res: Response) => {
    try {
        const orderid: number = parseInt(req.params.id)
        return res.json(await orderModel.showOrderDetails(orderid))

    } catch (error) {
        res.status(500).json({ 'serverError': error })
    }

}

// get userID from token
const getIdFromToken = async (req: Request): Promise<number> => {
    const authorizationHeader: string = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    const decoded: User = jwt.verify(token, process.env.SecretKey as string) as User
    return parseInt(decoded.id as unknown as string)
}



productRouter.post('/order/new', auth, CreateNewOrder)
productRouter.get('/showmyorders/', auth, GetMyOrders)
productRouter.post('/addtocart', auth, AddToCurrentOrders)
productRouter.post('/supmitorder/:id', auth, SubmitOrder)
productRouter.get('/orderdetails/:id', auth, GetOrderDetails)

export default productRouter