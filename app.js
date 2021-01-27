require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const rtsIndex = require('./routes/index.router');
const rtsOthers = require('./routes/other.routes')

var app = express();

var corsOptions = {
    credentials: true, origin: true
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  

// middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use('/static', express.static(path.join(__dirname, '../',"assets","avatar")));
app.use('/api', rtsIndex);
app.use('/api',rtsOthers)
app.use('/api/imgs', express.static(path.join(__dirname, "assets","imeges")));


// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// start server
//app.listen(process.env.PORT,'192.168.8.101', () => console.log(`Server started at port: ${process.env.PORT}`))
app.listen(process.env.PORT, () => console.log(`Server started at port: ${process.env.PORT}`))



