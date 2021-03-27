import express from 'express'
const router= express.Router()
import Product from '../models/productModel.js'
import { auth, admin} from '../middleware/auth.js'

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

// route /api/products/:id
// Delete Product
// Access: Private
router.delete('/:id', auth, admin, async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)

        if(product){
            await product.remove()
            res.status(201).json({msg: 'Product Removed Successfully'})
        } else{
            res.status(400).json({msg: 'Product Not Found'})
        }

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error' })
    }
})



// route /api/products
// Create Product
// Access: Private
router.post('/', auth, admin, async (req, res)=>{
    try{
        const product = new Product({
            name: 'sample name',
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'sample brand',
            category: 'sample category',
            countInStock: 0,
            numReviews: 12,
            description: 'sample description'
        })

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
      

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error' })
    }
})


// route /api/products/:id
// Update Product
// Access: Private
router.put('/:id', auth, admin, async (req, res)=>{
    try{
      const {name,price, image,brand,category,countInStock, numReviews,description} = req.body

      const product = await Product.findById(req.params.id)

      if(product){
          product.name = name || product.name
          product.image = image || product.image
          product.brand = brand || product.brand
          product.category = category || product.category
          product.countInStock = countInStock || product.countInStock
          product.numReviews = numReviews || product.numReviews
          product.description = description || product.description
          product.price = price || product.price

          const updatedProduct = await product.save()
          res.json(updatedProduct)

      } else{
          res.status(404).json({msg: 'Product Not Found'})
      }

      

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error' })
    }
})


export default router