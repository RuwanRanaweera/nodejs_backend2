const mongoose = require('mongoose');


var loadingSchema = new mongoose.Schema({
    imgName: {
        type: String,

    },
    title: {
        type: String,

    },
    color:{
        type: String,

    }

});





mongoose.model('Loading',loadingSchema);