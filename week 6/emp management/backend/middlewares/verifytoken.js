import jwt from "jsonwebtoken"
const {verify}=jwt

export function verifytoken(req,res,next){
    //token verification logic 
   const token=req.cookies?.token// to access the cokkies property of the req object we neeed cookie parser middle ware ,otherwisereq.cokkies is undefined
   console.log(token)
   //if req from unauthorized user  
if(!token){
    return res.status(401).json({message:"plz login"})
}
try{
//if token is existed
const decodedtoken =verify(token,"mike")
//console.log(decodedtoken)
req.user=decodedtoken
//call next
next();
}catch(err){
    res.status(401).json({message:"session expired plz relogin"})
}










}