    const db=require('../models');
    var fs = require('fs');
    const multer=require('multer');

    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            console.log(file+" file dest")
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            console.log(file+"   file name")
            callback(null, Date.now()+'-'+file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        // reject a file
        console.log(file.mimetype+" file filter");
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    exports.upload = multer({
        storage: storage,
        fileFilter: fileFilter
    });

    exports.createSeafood=async function(req,res,next){
        try{
            console.log("create ")
            console.log(req.body.name+"  create "+req.body.description);
            console.log(req.files);
            var filePath=[];

            for(var i=0;i<req.files.length;i++){
                filePath[i]=req.files[i].path;
                console.log(filePath);
            }

            let seafood=await db.Seafood.create({
                name:req.body.name,
                description:req.body.description,
                imageUrl:filePath
            });
            return res.status(200).json(seafood);
        }catch(e){
            return next(e)
        }
    }

    //  /seafood
    exports.getSeafood=async function(req,res,next){
        try{
            let seafood=await db.Seafood.find()
                .sort({createdAt:'desc'})
            return res.status(200).json(seafood);
        }catch(e){
            return next(e);
        }
    }

    // /seafood
    exports.deleteAllSeafood=async function(req,res,next){
        try{
            let seafood=await db.Seafood.find();
            db.Seafood.deleteMany({});
            return res.status(200).json(seafood);
        }catch(e){
            return next(e);
        }
    }

    // /seafood/:id
    exports.deleteSeafood=async function(req,res,next){
        try{
            console.log(req.params.id);
            let oneSeafood=await db.Seafood.findById(req.params.id);
            console.log(oneSeafood.profileImageUrl);
            fs.unlink(oneSeafood.profileImageUrl, (err) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    console.log('successfully deleted local image');
        }
        });
            oneSeafood.remove();
            return res.status(200).json(oneSeafood);
        }catch(e){
            return next(e);
        }
    }

    // /seafood/:id
    exports.getOneSeafood=async function(req,res,next){
        try{
            console.log(req.originalUrl +' get seafood '+req.params.id);
            let oneSeafood=await db.Seafood.findById(req.params.id);
            return res.status(200).json(oneSeafood);
        }catch(e){
            return next(e);
        }
    }
