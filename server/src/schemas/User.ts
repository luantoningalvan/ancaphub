import { Schema, model, Document } from 'mongoose'

interface User extends Document {
    username: string
    googleId: string
    picture: string

}

const UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: false,
        unique: true
    },
    picture: {
        type: String,
        required: false
    }

})

export default model<User>('User', UserSchema)
