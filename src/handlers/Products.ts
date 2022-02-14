import { ProductModel, Product } from '../Models/products'
import express, { Request, Response } from 'express'
import auth from '../middleware/auth';
const productRouter = express.Router();


const productModeler = new ProductModel;



const GetAll = async (req: Request, res: Response) => {
    return res.json(await productModeler.index())
}

const GetOne = async (req: Request, res: Response) => {
    return res.json(await productModeler.show(req.params.id))
}

const Create = async (req: Request, res: Response) => {
    return res.json(await productModeler.create({productname: req.body.productname,productprice: req.body.productprice}))
}

const Delete = async (req: Request, res: Response) => {
    return res.json(await productModeler.delete(req.params.id))
}

const Update = async (req: Request, res: Response) => {
    return res.json(await productModeler.update({id:req.body.id ,productname: req.body.productname,productprice: req.body.productprice}))
}
 

productRouter.get('/product', GetAll)
productRouter.get('/product/:id', GetOne)
productRouter.post('/product',auth, Create)
productRouter.delete('/product/:id',auth, Delete)
productRouter.put('/product/:id',auth, Update)

export default productRouter