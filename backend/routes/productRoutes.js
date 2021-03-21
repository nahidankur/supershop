import express from 'express'
const router= express.Router()
import Product from '../models/productModel.js'

// route /api/products
// Fetch All products
// Access: Private
router.get('/', async (req, res)=>{
    try{
        const products = await Product.find({})
        res.json(products)

    } catch(err){
        console.error(err)
        res.status(500).json({msg : 'Server Error'})
    }
    
})

// route /api/products/:id
// Fetch Single products
// Access: Private
router.get('/:id', async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)

        if(product){
            res.json(product)
        } else{
            res.status(404).json({msg: 'Product not found'})
        }

    }catch(err){
        console.error(err)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post Not Found'})
        }
        res.status(500).json({msg: 'Server Error' })
    }

})

export default router