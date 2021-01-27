const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = mongoose.model('User');
const Product = mongoose.model('Product');
const Customer = mongoose.model('Customer');
const Theme = mongoose.model('Theme');
const Order = mongoose.model('Order');


module.exports.findUser = (req, res) => {
    User.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
}

module.exports.findUserById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
}

module.exports.editUser = (req, res) => {

    User.findById(req.params.id, (err, user) => {
        if (!user)
            return next(new error('could not load'));
        else {
            user.fullName = req.body.fullName;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    if (err.code == 11000)
                        res.status(422).send(['Duplicate email adrress found.']);
                    else
                        return next(err);
                }

            });
        }
    });
}

module.exports.deleteUser = (req, res) => {
    User.findByIdAndRemove({ _id: req.params.id }, (err, User) => {
        if (err)
            res.json(err);
        else
            res.json('remove successfully');
    });
}

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {

    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, uid: user._id, user: _.pick(user, ['_id', 'fullName', 'email', 'usertype']) });
        }
    );


}






//check user type
module.exports.checkusertype = (req, res, next) => {

    User.findOne({ _id: req.params.id }, (err, User) => {
        if (err)
            res.json(err);
        else
            res.json({ usertype: User.usertype });
    });


}



//////////////////////////////////////////
// PRODUCT           ///////////////////////
//////////////////////////////////////////

module.exports.addprod = (req, res, next) => {

    var newprod = new Product({
        productName:req.body.productName,
        availablity:req.body.stock ,     
        price: req.body.price,
        description:req.body.description ,
        imgs:req.body.imgs
    })

    newprod.save().then(doc => {

        res.status(200).json(doc)

    }).catch(err => console.log(err))

}



module.exports.findproduct = (req, res) => {
    Product.find((err, products) => {
        if (err)
            console.log(err);
        else
            res.json(products);
    });
}


module.exports.findProductById = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err)
            console.log(err);
        else
            res.json(product);
    });
}


module.exports.deleteProduct = (req, res) => {
    Product.findByIdAndRemove({ _id: req.params.id }, (err, Product) => {
        if (err)
            res.json(err);
        else
            res.json('remove successfully');
    });
}

module.exports.editProduct = (req, res) => {

    Product.findById(req.params.id, (err, product) => {
        if (!product)
            return next(new error('could not load'));
        else {
            product.productName=req.body.productName,
            product.availablity=req.body.availablity,     
            product.price= req.body.price,
            product.description=req.body.description ,
            // product.imgs=req.body.imgs

            product.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    res.send(err);
                }

            });
        }
    });
}
//////////////////////////////////////
/////////////////////// THEME   ///
/////////////////////////////////


module.exports.getTheme = (req, res) => {
    Theme.findOne( (err, Theme) => {
        if (err)
            console.log(err);
        else
            res.json(Theme);
    });
}

module.exports.setTheme = (req, res) => {
    // Customer.findOne(
    Theme.findOne( (err, Theme) => {
        if (!Theme)
            return next(new error('could not load'));
        else {
        Theme.theme= req.body.theme;
        Theme.color= req.body.color;
        Theme.statusbarcolor = req.body.statusbarcolor;
           
        Theme.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    res.send(err);
                }

            });
        }
    });
}


// module.exports.addTheme = (req, res, next) => {

//     var newimg = new Theme({
//         theme: req.body.theme,
//         color: req.body.color,
//         statusbarcolor: req.body.statusbarcolor,
      
//     })

//     newimg.save().then(doc => {

//         res.status(200).json(doc)

//     }).catch(err => console.log(err))

// }





///////////////////////
/////////// MOBILE APP  ///////////////
/////////////////////////////



module.exports.regCustomer = (req, res, next) => {

    var newCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password

    })

    newCustomer.save((err, doc) => {
        if (!err)
        return res.status(200).json(doc);
        else {
            if (err.code == 11000)
            return res.status(201).json({msg: 'Duplicate email adrress found.'});
            else
                return next(err);
        }

    });

}

module.exports.resetCusPw = (req, res) => { 

const token=req.body.token
if (!token)
return res.send({ message: 'No token provided.' });
else {
jwt.verify(token, process.env.JWT_SECRET,
    (err, decoded) => {
        if (err){
            console.log('err 2');
            return res.send({message: 'Token authentication failed.' });
        }
        else {
         const id= decoded._id;
         console.log(id);

         Customer.findById(id, (err, cus) => {
            if (!cus)
                return next(new error('could not load'));
            else {  
                cus.password = req.body.password;
                cus.save((err, doc) => {
                    if (!err)
                    { 
                         console.log("successfully");
                       res.send('successfully');
                    }
                    
                    else {
                       res.send(['Something Went Wrong']);
                    }
    
                });  
            }
        });

        }
     
    }
)
}

}







module.exports.signIn = (req, res) => {

    Customer.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            return  res.status(201).json({  "msg": "Authentication failed. User not found."});
        } else {

      
                if ( user.verifyPassword(req.body.password)) {
                    return res.status(200).json({ "token": user.generateJwt() });
                } else {
                    return res.status(201).json({  "msg": "Authentication failed. Wrong password." });
                }
      
        }
    });

}


module.exports.ecomUserProfile = (req, res, next) => {

    Customer.findOne({ _id: req._id },
        (err,Customer) => {
            if (!Customer)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, uid: Customer._id, Customer: _.pick(Customer, ['_id', 'name', 'email', 'gender']) });
        }
    );


}


module.exports.findCustomerById = (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err)
            console.log(err);
        else
            res.json(customer);
    });
}




/////////////////////
//order ////////////

module.exports.addOrder = (req, res, next) => {



    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;



    var neworder = new Order({
        cus_id:req._id,
        customername: req.body.customername,
        email: req.body.email,
        telephone:req.body.telephone,
        deliveraddress: req.body.deliveraddress,
        orderitems:req.body.orderitems,
        datetime:dateTime
    })

    neworder.save().then(doc => {

        res.status(200).json(doc)

    }).catch(err => console.log(err))

}


module.exports.getOrder = (req, res) => {
    Order.find((err, order) => {
        if (err)
            console.log(err);
        else
            res.json(order);
    });
}

module.exports.getOrderbyuserid = (req, res) => {
    Order.find({ cus_id: req._id },(err, order) => {
        if (err)
            console.log(err);
        else
            res.json(order);
    });
}


module.exports.findOrderById = (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err)
            console.log(err);
        else
            res.json(order);
    });
}

module.exports.editOrder = (req, res) => {

    Order.findById(req.params.id, (err, order) => {
        if (!order)
            return next(new error('could not load'));
        else {  
    
            order.orderstatus=req.body.orderstatus
           

            order.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    res.send(err);
                }

            });
        }
    });
}