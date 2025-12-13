import express from 'express'
import router from './routes'
import { connectDB } from './database'
import { PORT } from './config/config'

const app = express()
app.use(express.json())

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})

connectDB()
    .then(() => {
      console.log('Base de datos conectada')
    })
    .catch((err) => {
      console.error('Error conectando a la base de datos:', err)
      process.exit(1)
    })