import passport from 'passport'
import keys from './keys'
const GoogleStrategy = require('passport-google-oauth20').Strategy;

import UserSchema from '../schemas/User'

//Serialize
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//Deserialize
passport.deserializeUser((id, done) => {
    UserSchema.findById(id)
        .then(user => {
            done(null, user)
        })
        .catch(err => {
            console.log(err)
            return
        })
})

// Google Strategy
passport.use(new GoogleStrategy({
    //Options for Google Strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: keys.google.callbackURL

}, (accessToken, refreshToken, profile, done) => {

        //Callback for GoogleStrategy

        const user_profile = {
            googleId: profile.id,
            username: profile.displayName,
            picture:  profile._json.picture
        }

        UserSchema.findOneAndUpdate({googleId: profile.id}, user_profile, {upsert: true})
            .then(user => {
                done(null, user)
            })
            .catch(err =>{
                done(null, err)
            })

    })
)
