const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    orgName:{
        type:String,
        require:true,
        unique: true
    },
    orgId:{
        type:String,
        require:true,
        unique: true
    }
})

const users = mongoose.model("users",userSchema)

module.exports= users;