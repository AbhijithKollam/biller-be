const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true
    },
    customerPhone:{
        type:Number,
        required:true,
        unique: true
    },
    customerAddress:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true,
        unique: true
    },
    orgId:{
        type:String,
    },
    orgName:{
        type:String,
    }
}) 

const customers = mongoose.model("customers",customerSchema)

module.exports= customers;