const db=require('../models');
var express=require('express');
var router = express.Router();
const {createSeafood,getSeafood,getOneSeafood,upload,deleteSeafood,deleteAllSeafood}=require('../handlers/Seafood');


router.route('/')
    .post(upload.single('profileImageUrl'),createSeafood)
    .get(getSeafood)
    .delete(deleteAllSeafood);

router.route('/:id')
    .get(getOneSeafood)
    .delete(deleteSeafood)

module.exports=router;