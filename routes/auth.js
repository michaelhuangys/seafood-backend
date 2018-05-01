var express = require('express');
var router = express.Router();
const {signin,signup}=require('../handlers/Auth');

router.post('/signin',signin);
router.post('/signup',signup);


module.exports = router;
