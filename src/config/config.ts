import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const MONGODB_URL = process.env.MONGODB_URL || ''
export const WEBHOOK_URL = process.env.WEBHOOK_URL || ''