const mongoose = require('mongoose');


var SliderboxSchema = new mongoose.Schema({
    img:{
        type: String,

    },
    title:{
        type: String,

    },
    description:{
        type: String,

    }
});


mongoose.model('Sliderbox', SliderboxSchema);