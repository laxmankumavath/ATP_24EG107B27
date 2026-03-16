#backend with db
generate package.json
create express server


install mongoose and connect to mongodb server

        restapi --mongodb native driver-->db server
        restapi --mongoose odm tool -->db server

build user rest api

                create
                read all
                read a user by id
                update user by id
                delete user by id 
                |
                |
                 --> crud operations


create schema and models of the resource(user)



schema steps 

//create user schema 
import {Schema} from 'mongoose'

//create object for Schema(username,password,email,age) class
const UserSchema=new Schema({
        //structure for user
        //filedname
        username:{
                type:String, //mongodb schema so S capital
                required:[true,"user name is mandatory "], //mandatory to enter user name
                minLength:[4,"minimum length of user name is 4 chars"],
                maxLength:[10,"maximum length of user nae is 10 chars"],
        },
        password:{
            type:String,
            required:[true,"password req"],
        },
        email:{
            type:String,
            required:[true,"email req"],
        },
        age:{
            type:String,
        }

});



create user api and define the routes


//use find one method in user api to read a doc with non object id fields

//use find by id to read doc with obj id


status code
success
//200--success
//201--created

client side mistakes
//400--bad request
//401--unauthorized
//404--not found 

server side error
//500--server error 


//cross origin and same origin 


cross origin req means:
when the client and server applications are running in different domains

same origin req means :
the clinet also running on the same domain of the server

cokkies will send along with req automatically , in same origin req.
but for cross origin req, the token should be explicitly included to the req 