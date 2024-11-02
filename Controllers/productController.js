const products = require("../Models/productSchema");

exports.addProduct=async(req,res)=>{
    console.log("body prod add",req.body)
    const {name,tax,rate,orgId,orgName}=req.body;
    try{
        const existingCustomer = await products.findOne({name: name});
        console.log(existingCustomer)
        if(existingCustomer){
            res.status(406).json({ status: 406, message: "Product already added" })
        }
        else{
            const newProduct= new products({
                productId: `PROD${Date.now()}`, 
                name:name,
                tax:tax,
                rate:rate,
                orgId:orgId,
                orgName:orgName,
                amount:((tax/100)*rate)+rate
            })
            console.log(newProduct)
            await newProduct.save()
            res.status(200).json({ status: 200, message: "Product added successfully",data:newProduct })

        }

    }
    catch(err){
        res.status(401).json({ status: 401, message: `Cannot add this product due to ${err}` })

    }
}

exports.getAllProducts=async(req,res)=>{
    console.log("====",req.query)
    const {orgId,orgName}=req.query;
    try{
        const allproducts = await products.find({ orgId: orgId ,orgName:orgName });
        console.log("all cust",allproducts.length)
        if(allproducts.length<0){
            res.status(406).json({ status: 406, message: "No products Added" })
        }
        else{
           
            res.status(200).json({ status: 200, data:allproducts})

        }

    }
    catch(err){
        res.status(401).json({ status: 401, message: `Cannot add this customer due to ${err}` })

    }
}
exports.editProduct=async(req,res)=>{
    console.log("====",req.body)
    const {orgId,orgName,productId,name,rate,tax}=req.body;
    try{
        const updatedProduct = await products.findOneAndUpdate(
            { productId: productId,orgId:orgId },  // Filter to find the document
            {$set:{name:name,rate:rate,tax:tax,amount:((tax/100)*rate)+rate}},          // The data to update
            { new: true }        // Options: return the updated document
          );
          if(updatedProduct){
            res.status(200).json({ status: 200, message:"Edited Successfully",data:updatedProduct})
          }
        

    }
    catch(err){
        res.status(401).json({ status: 401, message: `Cannot add this customer due to ${err}` })

    }
}
exports.deleteProduct=async(req,res)=>{
    console.log("====",req.query)
    const {orgId,orgName,productId}=req.query;
    try {
        // Use findOneAndDelete
        const deletedProduct = await products.findOneAndDelete({ productId:productId,orgId:orgId });
        console.log(deletedProduct);
        

        if (!deletedProduct) {
            return res.status(404).send({status:404,message:'Product not found'});
        }

        res.status(200).send({status:200,message:'Product deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send({status:500,message:'Error deleting product'});
    }
}