import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'

class App {
  public express: express.Application;

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes (): void {
    this.express.use(routes)
  }

  private database (): void {
    mongoose.connect('mongodb://localhost:27017')
  }

  public listenServer (): void {
    this.express.listen(3333, (): void => {
      console.log('Servidor iniciado na porta 3333', {
        useNewUrlParser: true
      })
    })
  }
}

export default new App()
