//create schema

import { Schema,model } from "mongoose";
// Create Product REST API with below features
// Product document structure
//      a.productId (required)
//      b.productName(required)
//      c.price(required, min price 10000 and max price 50000)
//      d.brand(required)
// REST API with below operations
//      a. Create product
//      b. Read all products
//      c. Read a product by productId
//      d. Update a product by productId
//      e. Delete a product by productId
const productschema=new Schema({
    productid:{
        type:String,
        required:[true,"product id is requried"]
    },
    productname:{
        type:String,
        required:[true,"product name is requried"]
    },
    price:{
        type:Number,
        minLength:[10000,'minimum price should be 10,000'],
        maxLength:[50000,"maximum price should be 50,000"],
        required:[true,"price is requried"],
    },
    brand:{
        type:String,
        required:[true,"brand is requried"]
    }

});
//generate pdt model
export const productmodel=model("product",productschema)