const mongoose = require('mongoose');


var themeSchema = new mongoose.Schema({
    theme: {
        type: String,

    },
    color: {
        type: String,

    },
    statusbarcolor: {
        type: String,

    }

});





mongoose.model('Theme', themeSchema);