import User from '../models/userModel.js'
import express from 'express'
const router  = express.Router()
import {body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcryptjs'
import {auth } from '../middleware/auth.js'

// route /api/auth/register
// Register new user
// Access: Public
router.post('/register',[
    body('name', 'Please include a name').not().isEmpty(),
    body('email', 'Please include a valid email address').isEmail(),
    body('password', 'Password must be at least 6 character').isLength({min: 6})
], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
     }
     const { name, email, password } = req.body 

     try{
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({ errors : [{ msg: 'User Already Registered' }] })
        }

        user = new User({
            name, email, password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
 
        await user.save()
 
        const payload = {
            user : {
                id: user.id
            }
        } 
       jwt.sign(payload, process.env.jwtSecret, {expiresIn : '10 days'}, (err, token)=>{
        if(err) throw err
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token
        })
    } )
     } catch(err){
        console.error(err)
        res.status(500).json({ msg: 'Server Error' })
    }
  
})

// route /api/auth/login
// Log in user
// Access: Public
router.post('/login',[
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password required').exists()
], async (req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    try{
       
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ errors : [{ msg : 'Invalid Credentials' }] })
        }

        const isMatch =  await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ errors : [{ msg : 'Invalid Credentials' }] })
        }
  
        const payload = {
            user : {
                id: user.id
            }
        }

        if(user && isMatch){
            jwt.sign(payload, process.env.jwtSecret, {expiresIn : '10 days'}, (err, token)=>{
                if(err) throw err
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: token
                })      
            })
        }

    } catch(err){
        console.error(err)
        res.status(500).json({ msg: 'Server Error' })
    }

})

// route /api/auth/profile
// Get current login user profile
// Access: Private
router.get('/profile',auth, async (req, res)=>{
   try{
   const user = await User.findById(req.user.id)

   if(user){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }) 

   } else {
    res.status(400).json({ errors : [{ msg : 'No User Found!' }] })

   }
   } catch(err){
    console.error(err)
    res.status(500).json({ msg: 'Server Error' })
}

})

export default router
