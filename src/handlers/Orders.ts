import { OrderModel, Product, Order, OrderProducts } from '../Models/orders'
import express, { Request, Response } from 'express'
import auth from '../middleware/auth';
const productRouter = express.Router();


const orderModel = new OrderModel;


const CreateNewOrder = async (req: Request, res: Response) => {
    const userid = parseInt(req.headers.userid as string)
    const noExist = await orderModel.CheckIfOpenOrderExist(userid)
    if (noExist == true) {
        console.log('There is', noExist)
        return res.json(await orderModel.create({ orderstatus: 'open', userid: userid }))

    } else {
        console.log('There is no', noExist)
        return res.json(await orderModel.GetOpenOrder(userid))
    }
}

const GetMyOrders = async (req: Request, res: Response) => {
    const userid = parseInt(req.headers.userid as string)
    return res.json(await orderModel.showAll(userid))
}

const AddToCurrentOrders = async (req: Request, res: Response) => {
    const newItem:OrderProducts = {...req.body }
    return res.json(await orderModel.addToCurrntOrder(newItem))
}

const SubmitOrder = async (req: Request, res: Response) => {
    const orderid:number = parseInt(req.params.id)
    return res.json(await orderModel.ChaneOrderFromOpenToSubmit(orderid))
}

const GetOrderDetails = async (req: Request, res: Response) => {
    const orderid:number = parseInt(req.params.id)
    return res.json(await orderModel.showOrderDetails(orderid))
}




productRouter.post('/order/new', auth, CreateNewOrder)
productRouter.get('/showmyorders/', auth, GetMyOrders)
productRouter.post('/order/:orderid/addproduct/:productid', auth, AddToCurrentOrders)
productRouter.post('/supmitorder/:id', auth, SubmitOrder)
productRouter.get('/orderdetails/:id', auth, GetOrderDetails)

export default productRouter