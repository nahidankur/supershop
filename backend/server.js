import express from 'express'
import dotenv from 'dotenv'
import './config/db.js'
dotenv.config()
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', userRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('Server is running under port 5000')
})