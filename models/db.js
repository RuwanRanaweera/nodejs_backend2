const mongoose = require('mongoose');



mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});


 

require('./user.model');
require('./product.model');
require('./customer.model');
require('./sliderbox.model');
require('./theme.model');
require('./order.model');

require('./loading.model');