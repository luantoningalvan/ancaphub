import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'
import cookieSession from 'cookie-session'
import keys from './config/keys'
import passport from 'passport'

class App {
  public express: express.Application;

  public constructor () {
    this.express = express()
    this.passport()
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

  private passport (): void {
      this.express.use(cookieSession({
          //Day in milliseconds
          maxAge: 24 * 60 * 60 * 1000,
          keys: [keys.session.cookieKey]
      }))

      //Initialize Passport
      this.express.use(passport.initialize())
      this.express.use(passport.session())
  }

  public listenServer (): void {
    this.express.listen(21018, (): void => {
      console.log('Servidor iniciado na porta 21018')
    })
  }
}

export default new App()
