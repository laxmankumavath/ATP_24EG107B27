import { Schema,model } from "mongoose";

const userschema=new Schema({
    firstname:{
        type:String,
        required:[true,'first name is requried']

    },
    lastname:{
        type:String

    },
    email:{
        type:String,
        required:['true',"email is required"],
        unique:[true,'email already exist']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    role:{
        type:String,
        enum:["user","author","admin"],
        required:[true,`invalid role`]
    },
    profileimageurl:{
        type:String,
    },
    isuseractive:{
        type:Boolean,
        default:true
    }
},{
        timestamps:true,
        versionKey:false,
        strict:"throw",
    }
);

export const usermodel=model("user",userschema)