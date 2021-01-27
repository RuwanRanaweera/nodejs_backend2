const express = require('express');
const router = express.Router();

const multer = require('multer')
const storage = multer.memoryStorage()
const up = multer({ storage:storage })

const jwtHelper = require('../config/jwtHelper');


const filectrl = require('../controllers/fileup')
const mailctrl = require('../controllers/mailsending')


router.post( '/editloadpage' , up.single('file') ,filectrl.editloadpage)
router.get('/getloadpage' , filectrl.getloadpage)


router.post('/filearrrr' , up.array('img' , 5 ) , filectrl.fileuparr22)

router.post('/filearr' , filectrl.testing) // firebase testing

router.post('/del' , filectrl.filedelete )

router.post('/email' , mailctrl.email)
router.post('/resetpassword' , mailctrl.resetpas)
router.post('/emsg' , mailctrl.emailmsg)
router.post('/signupemailmgs' , mailctrl.signupok)


router.post('/addsimg', up.single('file') ,filectrl.addslideritem);
router.get('/getsimg',filectrl.findsimgs);
router.get('/deletesimg/:id',filectrl.deletesimg);

router.get('/test' , filectrl.testing123)

module.exports = router;



