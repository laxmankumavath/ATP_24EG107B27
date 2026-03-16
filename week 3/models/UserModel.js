//create user schema 
import {Schema,model} from 'mongoose'

//create object for Schema(username,password,email,age) class
const UserSchema=new Schema({
        //structure for user
        //filedname
        username:{
                type:String, //mongodb schema so S capital
                required:[true,"user name is mandatory "], //mandatory to enter user name
                minLength:[4,"minimum length of user name is 4 chars"],
                maxLength:[10,"maximum length of user nae is 10 chars"],
                unique:[true,"username already taken"]//unique is not an validator its an option

        },
        password:{
            type:String,
            required:[true,"password req"],
        },
        email:{
            type:String,
            required:[true,"email req"],
            unique:[true,"email already exist"],
        },
        age:{
            type:Number,
        },


},
        {
            versionkey:false,
            timestamps:true,
        },
);
//generate UserModel
export const usermodel=model("user",UserSchema)//give a singular string , mongodb creates plural collection in db


