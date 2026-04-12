import exp from 'express'
import {connect} from 'mongoose'
import {userapp} from './api/userapi.js'
import {adminapp} from './api/adminapi.js'
import {authorapp} from './api/authorapi.js'
import {commonapp} from './api/commonapi.js'
import {config} from 'dotenv'
config()
const app=exp()

//body parser middleware
app.use(exp.json())

app.use("/user-api",userapp);
app.use("/admin-api",adminapp);
app.use("/author-api",authorapp);
app.use("/common-api",commonapp);
//connect to db
const connectdb=async()=>{
    try{
        await connect(process.env.db_url);
        console.log("db server is connected");

        //assign port
        const port = process.env.port || 2907
app.listen(port,()=>console.log(`server is listening on ${port}...`))

    }catch(err){
        console.log("err in db server",err)
    }
};
connectdb()


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


//invalid  path
app.use((req,res,next)=>{
    console.log(req.url)
    res.status(404).json({message:`path is ${req.url} is invalid`})
})