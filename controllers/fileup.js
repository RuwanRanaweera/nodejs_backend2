const fs = require('fs');

const mongoose = require('mongoose');
const loading = mongoose.model('Loading');
const Sliderbox = mongoose.model('Sliderbox');



exports.fileuparrxx = (req, res) => {

    console.log("uploaded")
    console.log(req.body.title)

    fs.writeFileSync('./assets/imeges/' + 'req.title ', req.file.buffer)

}// sample file upload



//////////////
module.exports.testing123 = (req, res, next) => {

    loading.findOne((err, doc) => {
        if (err)
            res.json(err);
        else
            res.json(doc);
    });



    loading.findOne((err, doc) => {
        if (!doc)
            return next(new error('could not load'));
        else {
            product.productName = req.body.productName;
            product.dateTime = req.body.dateTime;
            product.oriName = req.body.oriName;

            product.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    res.send(err);
                }

            });
        }
    });

}

///////////////////////////


module.exports.getloadpage = (req, res, next) => {

    loading.findOne((err, doc) => {
        if (err)
            res.json(err);
        else
            res.json(doc);
    });

}




module.exports.editloadpage = (req, res, next) => {

    const today = new Date();
    const date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
    const time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
    const dateTime = date + '_' + time;



    console.log("uploaded")

    if (req.file) {
        console.log(req.file)

    }
    loading.findOne((err, doc) => {
        if (!doc)
            return next(new error('could not load'));
        else {
            const x = doc.imgName;
            if (req.file) {

                fs.unlinkSync('./assets/imeges/' + x)
                fs.writeFileSync('./assets/imeges/' + 'loadingimg_'+ dateTime +'.' + req.body.oriName.split('.')[req.body.oriName.split('.').length - 1], req.file.buffer)
                doc.imgName ='loadingimg_'+ dateTime +'.' + req.body.oriName.split('.')[req.body.oriName.split('.').length - 1]
            }
            else {
                doc.imgName = doc.imgName;
            }
            doc.title = req.body.title;
            doc.color = req.body.textcolor;

            doc.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    res.send(err);
                }

            });
        }
    });

}


//////////////////// slider ///////////////////////////

module.exports.addslideritem = (req, res, next) => {

    const today = new Date();
    const date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
    const time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
    const dateTime = date + '_' + time;


    fs.writeFileSync('./assets/imeges/' + dateTime + '_slider.' + req.body.oriName.split('.')[req.body.oriName.split('.').length - 1], req.file.buffer)


    var newimg = new Sliderbox({
        img: dateTime + '_slider.' + req.body.oriName.split('.')[req.body.oriName.split('.').length - 1],
        title: req.body.title,
        description: req.body.description,

    })

    newimg.save().then(doc => {

        res.status(200).json(doc)

    }).catch(err => console.log(err))

}



module.exports.findsimgs = (req, res) => {
    Sliderbox.find((err, Sliderbox) => {
        if (err)
            console.log(err);
        else
            res.json(Sliderbox);
    });
}



module.exports.deletesimg = (req, res) => {
    Sliderbox.findByIdAndRemove({ _id: req.params.id }, (err, Sliderbox) => {
        if (err)
            res.json(err);
        else {
            fs.unlinkSync('./assets/imeges/' + Sliderbox.img)
            res.json('remove successfully');
        }

    });
}


/////////////////////END slider ///////////////////////////////







exports.testing = (req, res) => {

    console.log(req.body.productName);
    console.log(req.body.price);
    console.log(req.body.description);
    console.log(req.body.stock);

    console.log(req.body.imgs);
    // console.log(req.files);
    // req.files.forEach(element => {

    //     fs.writeFileSync('./' + element.originalname, element.buffer)

    // });

}




exports.fileuparr22 = (req, res) => {

    console.log("multi file");
    // console.log(req.files);
    console.log(req.body.name);

    // req.files.forEach(element => {

    //     fs.writeFileSync('./' + element.originalname, element.buffer)

    // });

}



exports.filedelete = (req, res) => { 

    console.log(req.body.filename)
    fs.unlinkSync('./' + req.body.filename)

}
