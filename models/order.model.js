const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    cus_id: {
        type: String,

    },
    customername: {
        type: String,

    },
    email: {
        type: String,

    },
    telephone: {
        type: String,
 
    }
    ,
    deliveraddress: {
        type:String,
    },

    orderitems: {
        type: Array
    },
    orderstatus: {
        type: String,default:"Pending"
    }
             ,
    created_at: {type: Date, default: Date.now}
,
    datetime:{
        type:String,
    },

});



mongoose.model('Order', orderSchema);