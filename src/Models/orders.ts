import client from "../Services/database";

export type Product = {
  id?: number;
  productname: string;
  productprice: number;
}

export type Order = {
  id?: number;
  orderstatus: string;
  userid: number;
}

export type OrderProducts = {
  id?:number;
  quantity:number;
  orderid:number;
  productid:number;
}

export class OrderModel {
  async GetOpenOrder(userid: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE  userid= $1 and orderstatus= \'open\''

      const result = await conn.query(sql, [userid])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not get Orders. Error: ${err}`)
    }
  }

  async CheckIfOpenOrderExist(userid: number): Promise<boolean> {
    try {
      const sql = 'select * from orders where userid= $1 and orderstatus= \'open\''
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [userid])
      const exist = result.rows.length
      conn.release()
      if (exist == 0) {
        return true;
      } else {
        return false;

      }
    } catch (err) {
      return false
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      console.log(b)

      b.orderstatus = 'open';
      const sql = 'INSERT INTO orders (orderstatus, userid) VALUES( $1, $2) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [b.orderstatus, b.userid])
 
      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not add new order fro userid ${b.userid}. Error: ${err}`)
    }
  }

  async showAll(userid: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE userid=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [userid])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not find Orders ${userid}. Error: ${err}`)
    }
  }

  async addToCurrntOrder(orderProducts: OrderProducts): Promise<OrderProducts> {
    try { 
      const sql = 'INSERT INTO orderitems (quantity, orderid, productid) VALUES( $1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [orderProducts.quantity, orderProducts.orderid, orderProducts.productid])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not add to Order ${orderProducts.orderid}. Error: ${err}`)
    }
  }

  async showOrderDetails(orderid: number): Promise<OrderProducts[]> {
    try {

      const sql = 'SELECT * FROM products INNER JOIN orderitems ON products.id = orderitems.productid WHERE orderitems.orderid=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [orderid])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not find Orders ${orderid}. Error: ${err}`)
    }
  }

  async ChaneOrderFromOpenToSubmit(orderid: number): Promise<Product> {
    try {
      const sql = 'UPDATE Orders SET orderstatus =\'Submited\'  WHERE id = $1 RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [orderid])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not close current open order ${orderid}. Error: ${err}`)
    }
  }

  

}