import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import client from './Services/database'
import userRouter from './handlers/users'
import productRouter from './handlers/Products'
import orderModel from './handlers/Orders'

const app: express.Application = express()
const address: string = "http://localhost:3000"
import cors from 'cors'
const corsOptions ={
    origin:'*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(userRouter)
app.use(productRouter)
app.use(orderModel)

app.get('/', function (req: Request, res: Response) {
    res.send('Hi')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
