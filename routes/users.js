const db=require('../models');
const express=require('express');
var router=express.Router();

const{
	addSeafood,
	deleteSeafood,
	getSeafood,
	users,
	user
}=require('../handlers/User');

router.get('/',users);

router.get('/users/:id',user);

router.route('/users/:id/cart')
      .get(getSeafood);

router.route('/users/:id/cart/:seafoodId')
      .post(addSeafood)
      .delete(deleteSeafood);

module.exports=router;