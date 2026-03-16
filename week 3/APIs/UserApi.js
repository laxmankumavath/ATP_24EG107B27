//create mini express app(seperate route)
import exp from 'express'
import {usermodel} from '../models/UserModel.js'
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifytoken } from '../middleware/verifytoken.js'
const {sign}=jwt
export const UserApp=exp.Router()

//define user rest api routes

//user login
UserApp.post('/auth',async(req,res)=>{
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
        const signedtoken = sign({email:user.email},"mike",{expiresIn:"1h"})//without quotes 100 seconds , with quotes "10" milli seconds ,"10w" 10 weeks,"10d",10 days
        //store token as httponly cokkie
        res.cookie("token",signedtoken,{
            httpOnly:true,
            sameSite:"lax",//relased restriction
            secure:false
        })
        //send res
        res.status(200).json({message:"login sucess",payload:user})
})
    //create new user

    UserApp.post("/user",verifytoken,async(req,res)=>{
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

    //readall users(protected route)
    UserApp.get("/user",verifytoken,async(req,res)=>{
        //get user details
        let userobj=req.user


        //read all from db
        let userlist=await usermodel.find()
        //send res
        res.status(200).json({message:"users",payload:userlist})
    })
    //read user by obj id
    UserApp.get("/users",verifytoken,async(req,res)=>{
        //read user email from req
        const emailofuser=req.user?.email
        console.log(emailofuser)
        //find user by id
        let userobj=await usermodel.findOne({email:emailofuser})
        //if user not found
        if(userobj===null){
         return   res.status(404).json({message:"user not found"})
        }
        //send res
        res.status(200).json({message:"user",payload:userobj})
    })  



    //update a user by id
    UserApp.put("/user/:id",verifytoken,async(req,res)=>{
        //get modified user from req
        const modifieduser=req.body
        const uid=req.params.id;
        //find user by id &update
        const updateduser = await usermodel.findOneAndUpdate({_id:uid},{$set:{...modifieduser}},{new:true,runValidators:true

        })
        res.status(200).json({message:"user modified",payload:updateduser})

    })

    //delete

    UserApp.delete("/user/:id",verifytoken,async(req,res)=>{
        const uid=req.params.id;
        const updateduser = await usermodel.findByIdAndDelete(uid)
        if(!updateduser){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user deleted",payload:updateduser})
    })




//app.use(verify token)--->every req
//userapp.get(path,verifytoken,req-handler)




