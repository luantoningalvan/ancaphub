import UserSchema from '../schemas/User'

const passport = require('passport')
const keys = require('./keys')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    //Options for Google Strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: keys.google.callbackURL

}, (accessToken, refreshToken, profile, done) => {

        const user_profile = {
            googleId: profile.id,
            username: profile.displayName,
            picture:  profile._json.picture
        }

        UserSchema.findOneAndUpdate({googleId: profile.id}, user_profile, {upsert: true})
            .then(user => {
                console.log(user)
                return user
            })
            .catch(err =>{
                console.log(err)
                return err
            })

       return
    })
)
