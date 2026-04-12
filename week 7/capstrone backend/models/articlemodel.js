import { Schema,model,Types } from "mongoose";


const commentschema=new Schema({
    user:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"user id is required"]
    },
    comment:{
        type:String
    },
})
const articleschema=new Schema({
    author:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,'author id  is required']
    },
    title:{
        type:String,
        required:[true,"title is required"]
    },
    category:{
        type:String,
        required:[true,"mention the category"]

    },
    content:{
        type:String,
        required:[true,"content is required"]
    },
    comment:[commentschema],
    isarticleactive:{
        type:Boolean,
        default:true
    }
},

{
    versionKey:false,
    timestamps:true,
    strict:"throw"
})
export const articlemodel=model("article",articleschema)
