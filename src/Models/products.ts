import client from "../Services/database";

export type Product = {
     id?: number;
     productname: string;
     productprice: number;
}

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(b: Product): Promise<Product> {
      try {
    const sql = 'INSERT INTO products (productname, productprice) VALUES($1, $2) RETURNING *'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [b.productname, b.productprice])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not add new product ${b.productname}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Product> {
      try {
    const sql = 'DELETE FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not delete product ${id}. Error: ${err}`)
      }
  }


  async update(b: Product): Promise<Product> {
    try {
  const sql = 'UPDATE products SET productname =$1 , productprice = $2  WHERE id = $3 RETURNING *'
  // @ts-ignore
  const conn = await client.connect()

  const result = await conn.query(sql, [b.productname, b.productprice,b.id])

  const product = result.rows[0]

  conn.release()

  return product
    } catch (err) {
        throw new Error(`Could not add new product ${b.productname}. Error: ${err}`)
    }
}

}