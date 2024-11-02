const customers = require("../Models/customerSchema");

exports.addCustomer=async(req,res)=>{
    console.log("====",req.body)
    const {cName,cPhone,cAddress,orgId,orgName}=req.body;
    try{
        const existingCustomer = await customers.findOne({
            customerPhone: cPhone,
            customerName: cName
        });
        console.log(existingCustomer)
        if(existingCustomer){
            res.status(406).json({ status: 406, message: "Customer already added" })
        }
        else{
            const newCustomer= new customers({
                customerId: `CUS${Date.now()}`, 
                customerName:cName,
                customerPhone:cPhone,
                customerAddress:cAddress,
                orgId:orgId,
                orgName:orgName
            })
            console.log(newCustomer)
            await newCustomer.save()
            res.status(200).json({ status: 200, message: "Customer added successfully",data:newCustomer })

        }

    }
    catch(err){
        res.status(401).json({ status: 401, message: `Cannot add this customer due to ${err}` })

    }
}
exports.getAllCustomers=async(req,res)=>{
    console.log("====",req.query)
    const {orgId,orgName}=req.query;
    try{
        const allCustomers = await customers.find({ orgId: orgId ,orgName:orgName });
        console.log("all cust",allCustomers.length)
        if(allCustomers.length<0){
            res.status(406).json({ status: 406, message: "No Customers Added" })
        }
        else{
           
            res.status(200).json({ status: 200, data:allCustomers})

        }

    }
    catch(err){
        res.status(401).json({ status: 401, message: `Cannot add this customer due to ${err}` })

    }
}
exports.editCustomer=async(req,res)=>{
    console.log("====",req.body)
    const {orgId,orgName,customerId,customerName,customerAddress,customerPhone}=req.body;
    try{
        const updatedProduct = await customers.findOneAndUpdate(
            { customerId: customerId,orgId:orgId },  // Filter to find the document
            {$set:{customerName:customerName,customerAddress:customerAddress,tacustomerPhonex:customerPhone}},          // The data to update
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
exports.deleteCustomer=async(req,res)=>{
    console.log("====",req.query)
    const {orgId,orgName,customerId}=req.query;
    try {
        // Use findOneAndDelete
        const deletedCustomer = await customers.findOneAndDelete({ customerId:customerId,orgId:orgId });
        console.log(deletedCustomer);
        


        res.status(200).send({status:200,message:'Customer deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send({status:500,message:'Error deleting Customer'});
    }
}