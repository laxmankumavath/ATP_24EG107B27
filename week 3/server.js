import exp from 'express'
import {connect} from 'mongoose'
import {UserApp} from './APIs/UserApi.js';
import { productapp } from './APIs/productApi.js';      
import cookieParser from 'cookie-parser'; 
const app=exp();
app.use(exp.json())//convert js to json

app.use(cookieParser())//used for authentication (admin,user)
//forward req to UserApp if path starts from /user api
app.use('/user-api',UserApp)
app.use('/pdt-api',productapp)



//connect to mongodb

async function connectdb(){
try{
    await connect("mongodb://localhost:27017/firstdb");//if any error even the code is correct then replace local host with 127.0.0.1
    console.log("DB connection success")
    //start server
app.listen(4000,()=>console.log("server on port 4000..."))
}catch(err){
    console.log("err in db connection",err)
}
  
}
connectdb();
//error(name,message,callstack)

//error handling middleware
app.use((err,req,res,next)=>{//error handling middleware parameters have 4 parameters
    //res.status().json({message:"error ocuured",error:err.message})

    //validator error
    console.log(err.name)
    if(err.name==='ValidatorError'){
        return res.status(400).json({message:"error occured ",error:err.message})
    }
    //cast error
    if(err.name==='CastError'){
        return res.status(400).json({message:"error occured ",error:err.message})
    }

    //send server error
    res.status(500).json({message:"error occured ",error:err.message})
})


