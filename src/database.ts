import mongoose from 'mongoose'
import { MONGODB_URL } from './config/config'

export const connectDB = async (): Promise<void> => {
  mongoose.set('strictQuery', true)
  await mongoose.connect(MONGODB_URL)
}