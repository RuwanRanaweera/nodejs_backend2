const nodemailer = require('nodemailer')
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'moradifferentview@gmail.com',
      pass: 'ksepohwqxbjinwiq'
    }
  });




  exports.email = (req,res) =>{

    var mailOptions = {
     from: 'moradifferentview@gmail.com',
     to: req.body.email,
     subject:req.body.sub,
     text: req.body.body
   };
   
   transporter.sendMail(mailOptions, function(error, info){
     if (error) {
       console.log(error);
     } else {
      res.send("ok");
       console.log('Email sent: ' + info.response);
     }
   });

}


exports.resetpas = (req,res) =>{


  Customer.findOne({ email: req.body.email },
    (err, cus) => {
        if (!cus)
            return res.json({ message: 'Email Is Not Registered' });
        else
{


  var mailOptions = {
    from: 'moradifferentview@gmail.com',
    to: cus.email,
    subject:"Reset your password",
    text:'http://localhost:4200/resetpw/'+cus.generateJwt()
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return res.json({ message: 'Something Went Wrong' });
       console.log(error);
    } else {
      return res.json({ message: 'Check Your Emails' });
      console.log('Email sent: ' + info.response);
    }
  });


}

    }
);

}


exports.emailmsg = (req,res) =>{


  var mailOptions = {
    from: 'moradifferentview@gmail.com',
    to: req.body.email,
    subject:req.body.sub,
    text:req.body.msg
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return res.json({ message: 'Something Went Wrong' });
       console.log(error);
    } else {
      return res.json({ message: 'done' });
      console.log('Email sent: ' + info.response);
    }
  });
 

}


exports.signupok = (req,res) =>{


  var mailOptions = {
    from: 'moradifferentview@gmail.com',
    to:req.body.email,
    subject:"ACCOUNT CREATE SUCCESSFULL",
    text:"Welcome to e-commerce"
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return res.json({ message: 'Something Went Wrong' });
       console.log(error);
    } else {
      return res.json({ message: 'done' });
      console.log('Email sent: ' + info.response);
    }
  });
 

}