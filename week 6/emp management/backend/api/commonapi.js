import exp from 'express'
import { usermodel } from '../models/usermodel.js' 
import jwt from 'jsonwebtoken'
import { verifytoken } from '../middlewares/verifytoken.js'
import {hash,compare} from 'bcryptjs'
export const commonapp=exp.Router()
const {sign} = jwt

    commonapp.post("/user",async(req,res)=>{
        try{
            //get new user object
            const newuser=req.body;
            //hash the password (bcryptjs module)
            let hashpassword=await hash(newuser.password,10)
            //replace password with hashpassword
            newuser.password=hashpassword
            //create new user doc
            const newuserdoc=new usermodel(newuser)
            await newuserdoc.save()
            //responds
            res.status(201).json({message:"user created successfully"})//201 success
        }catch(err){
            console.log("Registration error:", err.message)
            res.status(400).json({message:"Registration failed", error:err.message})
        }
    });


//user login
commonapp.post('/auth',async(req,res)=>{
    try{
        //get user cred
        const{email,password}=req.body
        
        if(!email || !password){
            return res.status(400).json({message:"email and password required"})
        }
        
        //verify email
        let user = await usermodel.findOne({email:email})
        //if email not found
        if(!user){
            return res.status(404).json({message:"invalid email"})
        }
        //compare passsword
        let result = await compare(password,user.password)
        //if password not match
        if(result===false){
            return res.status(400).json({message:"invalid password"})
        }
        //if passwords are matched
            //create token(jsonwebtoken--jwt--jaat)
            const signedtoken = sign({email:user.email},"mike",{expiresIn:"1w"})//without quotes 100 seconds , with quotes "10" milli seconds ,"10w" 10 weeks,"10d",10 days
            //store token as httponly cokkie
            res.cookie("token",signedtoken,{
                httpOnly:true,
                sameSite:"lax",//relased restriction
                secure:false
            })
            //send res
            res.status(200).json({message:"login success", user: {email: user.email, role: user.role}})
    }catch(err){
        console.log("Login error:", err.message)
        res.status(500).json({message:"Login failed", error:err.message})
    }
})

// Get all articles (public endpoint)
commonapp.get('/articles', async (req, res) => {
    try {
        const { articlemodel } = await import('../models/articlemodel.js')
        const articles = await articlemodel.find().select('-password')
        res.status(200).json({ articles })
    } catch (err) {
        console.log("Error fetching articles:", err.message)
        res.status(500).json({ message: "Error fetching articles", error: err.message })
    }
})

// Get article by ID (public endpoint)
commonapp.get('/articles/:id', async (req, res) => {
    try {
        const { articlemodel } = await import('../models/articlemodel.js')
        const { id } = req.params
        const article = await articlemodel.findById(id)
        
        if (!article) {
            return res.status(404).json({ message: "Article not found" })
        }
        
        res.status(200).json(article)
    } catch (err) {
        console.log("Error fetching article:", err.message)
        res.status(500).json({ message: "Error fetching article", error: err.message })
    }
})