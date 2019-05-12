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
    mongoose.connect('mongodb://localhost:27017/ancaphub_db', { useNewUrlParser: true })
    // Avoids deprecation warnings
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
  }

  public listenServer (): void {
    this.express.listen(21018, (): void => {
      console.log('Servidor iniciado na porta 21018')
    })
  }
}

export default new App()
