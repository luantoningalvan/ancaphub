import { Schema, model, Document } from 'mongoose'

interface Book extends Document {
  title: string
  author: string
  description: string
  cover: string
  buyLinks: string[]
  avaliableFormats: string[]
  languages: string[]
}

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: String,
  cover: String,
  buyLinks: Array,
  avaliableFormats: {
    type: Array,
    required: true
  },
  languages: Array
})

export default model<Book>('Book', BookSchema)
