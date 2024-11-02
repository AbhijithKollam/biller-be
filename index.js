const router=require('./Routes/router')

require("dotenv").config()
const express = require('express');

require('./DB/connection') 

const cors= require('cors')
const biller = express();
biller.use(cors());
biller.use(express.json());
biller.use(router)   ;

const PORT = 3210;
biller.listen(PORT,()=>{
    console.log(`Biller Server is connected at port ${PORT}`);
    
})
