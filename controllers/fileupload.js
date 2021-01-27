const multer = require("multer");
const path = require("path");
//const cloudinary = require("cloudinary").v2;
//const passport = require("passport");
//const User = require("../db/users");
const ObjectID = require("mongodb").ObjectID;
//const Candidate = require("../db/candidates");
var fs = require("fs");
// 

const storageAvatar = multer.diskStorage({
  destination: "../assets/avatar",
  filename: function(req, file, cb) {
    console.log(req.params.id);

    cb(null, req.params.id + path.extname(file.originalname));
  }
});


const avatarUpload = multer({
  storage: storageAvatar,
  limits: { fileSize: 2000000000 },

  // fileFilter: function(req, file, cb) {
  //   var fileTypesAllowed = /jpeg|png|jpg|gif/;
  //   var extAvatar = fileTypesAllowed.test(
  //     path.extname(file.originalname).toLowerCase()
  //   );
  //   var mimeType = fileTypesAllowed.test(file.mimetype);

  //   if (mimeType && extAvatar) {
  //     return cb(null, true);
  //   } else {
  //     cb({ msg: "unsupported_format" });
  //   }
  // }
}).single("file");



exports.profileimgup = (req, ress, next) => {
  var res = "";
  
// console.log(req)

        avatarUpload(req, res, err => {
          if (err) {
            console.log("multer errorr-  " + JSON.stringify(err));
            console.log(req.file);
            if (err.code == "LIMIT_FILE_SIZE") {
              ress.status(400).send("file_too_large");
            }
            if (err.msg == "unsupported_format") {
              ress.status(400).send("unsupported_file_format");
            }
          } else {
            console.log(path.extname(req.file.originalname));
         

     

            console.log(req.file);
          }
        });
      }


// exports.cvupload = (req, ress, next) => {
//   console.log("canid - " + req.params.id);

//   var res = "";
//   console.log(JSON.stringify(req.headers.authorization));
//   passport.authenticate(
//     "jwtstrategy",
//     { session: false },
//     (err, user, info) => {
//       console.log(JSON.stringify(req.headers.authorization));

//       console.log("baba yaga ZEEVEE");

//       if (!user) {
//         console.log("error - " + info);
//         ress.status(401).json(info);
//       } else {
//         cvUpload(req, res, err => {
//           if (err) {
//             console.log("multer errorr-  " + JSON.stringify(err));

//             if (err.code == "LIMIT_FILE_SIZE") {
//               ress.status(400).send("file_too_large");
//             }
//             if (err.msg == "unsupported_format") {
//               ress.status(400).send("unsupported_file_format");
//             }
//           } else {
//             console.log(path.extname(req.file.originalname));
//             var cvexte = path.extname(req.file.originalname);

//             Candidate.findById(ObjectID(req.params.id))
//               .then(candoc => {
//                 var cvno = candoc.cvUrl.length;
//                 console.log("cv number - " + cvno);
//                 var filePath =
//                   "/home/dealwithit/Documents/dev/recaux/assets/cv/" +
//                   req.params.id +
//                   cvexte;
//                 cloudinary.uploader.upload(
//                   filePath,
//                   {
//                     tags: "basic_sample",
//                     folder: "recaux/resume",
//                     public_id: req.params.id + "_" + cvno,
//                     sign_url: true
//                   },
//                   function(err, cvuploaddata) {
//                     console.log();
//                     console.log("** File Upload");
//                     if (err) {
//                       console.warn(err);
//                     }
//                     console.log(
//                       "* public_id for the uploaded pdf is generated by Cloudinary's service."
//                     );
//                     console.log("* " + cvuploaddata.public_id);
//                     console.log("* " + cvuploaddata.url);
//                     // Candidate.updateOne({_id:req.params.id},{$set:{cvUrl:cvuploaddata.url}})
//                     Candidate.updateOne(
//                       { _id: req.params.id },
//                       {
//                         $push: {
//                           cvUrl: {
//                             url: cvuploaddata.url,
//                             recievedDate: new Date().toISOString()
//                           }
//                         }
//                       }
//                     )
//                       .then(doc => {
//                         //var filePath = 'c:/book/discovery.docx';
//                         fs.unlinkSync(filePath);
//                         Candidate.findById(ObjectID(req.params.id)).then(canupdateddco=>{
//                           console.log(canupdateddco)
                         
//                           ress.status(200).json(canupdateddco.cvUrl);
//                         }).catch(err=>{console.log(err)})
                        
//                       })
//                       .catch(err => {});

//                     //ress.status(200).json(cvuploaddata);

//                     //waitForAllUploads("pizza",err,image);
//                   }
//                 );
//               })
//               .catch(err => {});

//             // cloudinary.uploader.upload(
//             //   "/home/dealwithit/Documents/dev/recaux/assets/cv/" +
//             //     req.params.id +
//             //     cvexte,
//             //   {
//             //     tags: "basic_sample",
//             //     folder: "recaux/resume",
//             //     public_id: req.params.id,
//             //     sign_url: true
//             //   },
//             //   function(err, cvuploaddata) {
//             //     console.log();
//             //     console.log("** File Upload");
//             //     if (err) {
//             //       console.warn(err);
//             //     }
//             //     console.log(
//             //       "* public_id for the uploaded pdf is generated by Cloudinary's service."
//             //     );
//             //     console.log("* " + cvuploaddata.public_id);
//             //     console.log("* " + cvuploaddata.url);

//             //     Candidate.updateOne({_id:req.params.id},{$set:{cvUrl:cvuploaddata.url}}).then(doc=>{
//             //       ress.status(200).json(cvuploaddata);
//             //     }).catch(err=>{

//             //     })

//             //     //ress.status(200).json(cvuploaddata);

//             //     // waitForAllUploads("pizza",err,image);
//             //   }
//             // );

//             console.log(req.file);
//           }
//         });
//       }
//     }
//   )(req, res, next);
// };