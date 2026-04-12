

import { config } from "dotenv";
import jwt from 'jsonwebtoken'
const {verify} = jwt
config()

export const verifyToken = (...allowedUsers) =>{
    return (req,res,next)=>{
    try{
        const token = req.cookies?.token
    if(!token){
        return res.status(401).json({message:"login avvu bro"})
    }  
    const decoded = verify(token,process.env.SECRET_KEY)

    console.log(decoded)
    if(!allowedUsers.includes(decoded.role)){
        return res.status(403).json({message:"forbidden"})
    }
    req.user=decoded
        console.log(decoded)
        next();

    }catch(err){
         res.status(401).json({message:"session expired"})
        }
    }
}







