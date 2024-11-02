const express= require('express');
const router= express.Router();

const userController=require('../Controllers/userController');
const customerController=require('../Controllers/customerController');
const productController=require('../Controllers/productController');

router.post('/user/register',userController.register);
router.post('/user/login',userController.login);
router.post('/customer/add',customerController.addCustomer);
router.get('/customer/getAll',customerController.getAllCustomers);
router.post('/product/add',productController.addProduct);
router.get('/product/getAll',productController.getAllProducts);
router.post('/product/edit',productController.editProduct);
router.get('/product/delete',productController.deleteProduct);
router.post('/customer/edit',customerController.editCustomer);
router.get('/customer/delete',customerController.deleteCustomer);

module.exports= router;