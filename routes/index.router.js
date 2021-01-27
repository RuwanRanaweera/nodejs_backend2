const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const fileupload = require('../controllers/fileupload')


const jwtHelper = require('../config/jwtHelper');

router.post('/register',jwtHelper.verifyJwtToken, ctrlUser.register);


router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.get('/userlist',jwtHelper.verifyJwtToken,ctrlUser.findUser);
router.get('/user/:id',jwtHelper.verifyJwtToken,ctrlUser.findUserById);
router.get('/user/delete/:id',jwtHelper.verifyJwtToken,ctrlUser.deleteUser);
router.post('/user/edit/:id',jwtHelper.verifyJwtToken,ctrlUser.editUser)

router.get('/checkusertype/:id',ctrlUser.checkusertype);


router.post('/upload/:id',fileupload.profileimgup);


router.post('/addnewproduct',ctrlUser.addprod);
router.get('/productlist',ctrlUser.findproduct);
router.get('/product/delete/:id',ctrlUser.deleteProduct);
router.get('/product/:id',ctrlUser.findProductById);
router.post('/product/edit/:id',ctrlUser.editProduct);

router.post('/regcus',ctrlUser.regCustomer);
router.post('/signin',ctrlUser.signIn);
router.get('/ecomuserprofile', jwtHelper.verifyJwtToken ,ctrlUser.ecomUserProfile);
router.post('/resetcuspw' ,ctrlUser.resetCusPw);
router.get('/getcusbyid/:id', ctrlUser.findCustomerById);


// router.post('/at',ctrlUser.addTheme);  //add theme, not use
router.get('/getTheme',ctrlUser.getTheme); 
router.post('/setTheme',ctrlUser.setTheme); 

 router.post('/addOrder' , jwtHelper.verifyJwtToken , ctrlUser.addOrder);
//router.post('/addOrder' , ctrlUser.addOrder);
  
router.get('/getorders',ctrlUser.getOrder);
router.get('/getordersbyuserid', jwtHelper.verifyJwtToken , ctrlUser.getOrderbyuserid);
router.get('/order/:id',ctrlUser.findOrderById);
router.post('/orderedit/:id',ctrlUser.editOrder)

module.exports = router;



