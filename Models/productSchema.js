const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true,
        unique: true
    },
    rate:{
        type:Number,
        required:true,
    },
    tax:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    orgId:{
        type:String,
    },
    orgName:{
        type:String,
    }
}) 

const products = mongoose.model("products",productSchema)

module.exports= products;