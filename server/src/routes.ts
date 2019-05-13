import { Router } from 'express'
import BookController from './controllers/BookController'

const routes = Router()

const passport = require('passport')
const passportSetup = require('./config/passport')

routes.get('/books', BookController.index)
routes.post('/books', BookController.create)

//Auth with google
routes.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}))

routes.get('/test', (req, res) => {
    res.send("teste")
})

// Callback redirect Google
routes.get('/auth/google/redirect', passport.authenticate('google'), (req,res) =>{
    console.log(req.user)
    res.send("Redirected by google!")
})

export default routes
