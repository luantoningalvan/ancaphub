import { Request, Response } from 'express'
import BookScheme from '../schemas/Book'

class BookController {
  public async index (req: Request, res: Response): Promise<Response> {
    const books = await BookScheme.find()
    return res.json(books)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const book = await BookScheme.create(req.body)
    return res.json(book)
  }
}

export default new BookController()
