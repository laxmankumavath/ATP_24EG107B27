import exp from 'express'
import { usermodel } from '../models/usermodel.js' 
import jwt from 'jsonwebtoken'
import { verifytoken } from '../middlewares/verifytoken.js'
import {hash,compare} from 'bcryptjs'
export const commonapp=exp.Router()
const {sign} = jwt

    commonapp.post("/user",async(req,res)=>{
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
        res.status(201).json({message:"user created"})//201 success

    });


//user login
commonapp.post('/auth',async(req,res)=>{

    //get user cred
    const{email,password}=req.body
    //verify email
    let user = await usermodel.findOne({email:email})
    //if email not found
    if(!user){
        return res.status(404).json({message:"invalid email"})
    }
    //compare passsword
    let result = compare(password,user.password)
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
        let userObj=user.toObject()
        delete userObj.password
        //send res
        res.status(200).json({message:"login success", payload: userObj})
})
commonapp.get("/logout",(req,res)=>{
    //delte token from cookie storage
      res.clearCookie("token",{
            httpOnly:true,
            sameSite:"lax",//relased restriction
            secure:false
        })
        res.status(200).json({message:"logout sucess"})
});