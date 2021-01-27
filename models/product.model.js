const mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
    productName: {
        type: String,

    },
    availablity: {
        type: String,

    },

    
    price: {
        type:Number,
    },

    description: {
        type: String
    }
,
    imgs: {
        type: Array
    }
});





mongoose.model('Product', productSchema);