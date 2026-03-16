import exp from 'express'
import{productmodel} from '../models/pdtModel.js'
export const  productapp=exp.Router()

//defining pdt rest api

productapp.post("/product",async(req,res)=>{
    const newpdt=req.body;
    // console.log(req.body)
    const newpdtdoc=new productmodel(newpdt)
    await newpdtdoc.save()
    res.status(201).json({message:"product created"})
});


//read all
productapp.get("/product",async(req,res)=>{
    let pdtlist=await productmodel.find()
    res.status(200).json({message:"products",payload:pdtlist})
})

//read a pdt with id
productapp.get("/product/:productid",async(req,res)=>{
    let pid=req.params.productid
    //console.log(req.params.productid)
    let pdtobj=await productmodel.findOne({productid:pid})
    console.log(pdtobj)
    if(!pdtobj){
        return   res.status(404).json({message:"product not found"})
    }
    res.status(200).json({message:"product",payload:pdtobj})
})

//read a pdt by brand
productapp.get("/product/:brand",async(req,res)=>{
    let pb=req.params.brand
    console.log(req.params.brand)
    let pdtobj=await productmodel.findOne({brand:pb})
    //console.log(pdtobj)
    if(!pdtobj){
        return   res.status(404).json({message:"product not found"})
    }
    res.status(200).json({message:"product",payload:pdtobj})
})

productapp.put("/product/:productid",async(req,res)=>{
    const modifiedpdt=req.body
    const pid=req.params.productid;
    const updatedproduct = await productmodel.findOneAndUpdate({productid:pid},{$set:{...modifiedpdt}},{new:true,runValidators:true})
    res.status(200).json({message:"product modified",payload:updatedproduct})
})


    productapp.delete("/product/:productid",async(req,res)=>{
        const pid=req.params.productid;
        const updatedproduct = await productmodel.findOneAndDelete({productid:pid})
        if(!updatedproduct){
            return res.status(404).json({message:"product not found"})
        }
        res.status(200).json({message:"product deleted",payload:updatedproduct})
    })
