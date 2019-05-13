import { Router } from 'express'
import BookController from './controllers/BookController'
import AuthController from './middlewares/AuthController'
const routes = Router()

const passport = require('passport')
const passportSetup = require('./config/passport')

routes.get('/books', BookController.index)
routes.post('/books', BookController.create)

//Auth with google
routes.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}))

// Callback redirect Google
routes.get('/auth/google/redirect', passport.authenticate('google'), (req,res) =>{

    // Para voltar para aplicação usar um redirect para a url
    // example:
    // res.redirect("https://ancaphub.com/dashboard")

    res.status(200).json({
        message:"Logged-in with success!",
        success: true
    })
})

//Logout
routes.get('/logout', AuthController.logout)


export default routes
