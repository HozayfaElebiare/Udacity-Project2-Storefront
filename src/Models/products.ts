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
      const sql = 'SELECT * FROM books'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM books WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find book ${id}. Error: ${err}`)
    }
  }

  async create(b: Product): Promise<Product> {
      try {
    const sql = 'INSERT INTO books (title, author, total_pages, summary, typeers) VALUES($1, $2, $3, $4, $5) RETURNING *'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn
        .query(sql, [b.productname, b.productprice])

    const book = result.rows[0]

    conn.release()

    return book
      } catch (err) {
          throw new Error(`Could not add new book ${b.productname}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Product> {
      try {
    const sql = 'DELETE FROM books WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    const book = result.rows[0]

    conn.release()

    return book
      } catch (err) {
          throw new Error(`Could not delete book ${id}. Error: ${err}`)
      }
  }
}