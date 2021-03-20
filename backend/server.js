import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import './config/db.js'
dotenv.config()
const app = express()


app.get('/', (req, res)=>{
    res.send('Api is running')
})

app.get('/api/products', (req, res)=>{
    res.json(products)
})
app.get('/api/products/:id', (req, res)=>{
    const product = products.find(product => product._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('Server is running under port 5000')
})