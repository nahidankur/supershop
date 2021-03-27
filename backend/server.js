import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import './config/db.js'
dotenv.config()
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import CurretOrderRoute from './routes/CurrentOrderRoute.js'
import uploadRoute from './routes/uploadRoute.js'
const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/auth/order', orderRoutes)
app.use('/api/auth/myorders', CurretOrderRoute )
app.use('/api/upload', uploadRoute)

app.use('/api/config/paypal', (req, res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)

})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('Server is running under port 5000')
})