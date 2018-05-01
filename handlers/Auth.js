const db=require('../models');
const jwt=require('jsonwebtoken');

// /auth/sign
exports.signin=async function(req,res,next){
	try{
		let user=await db.User.findOne({
			email:req.body.email
		})
		let{id,username,cart,purchased}=user;
		let isMatch=await user.comparePassword(req.body.password);
		if(isMatch){
			 let token = jwt.sign(
                {
                    id,
                    username,
                },
                process.env.SECRET_KEY
            );
		   return res.status(200).json({
                id,
                username,
                cart,
                purchased,
                token
            });
		}else{
			return next({
				status:400,
				message:'Invalid Email/Password.'
			})
		}
	}catch(e){
		return next({status:400,message:'Invalid Email/Password'});
	}
}

exports.signup=async function(req,res,next){
	try{
		let user=await db.User.create(req.body);
		let{id,username}=user;
		console.log(id+"  "+username);
		let token=jwt.sign({
			id,
			username,
		},
            process.env.SECRET_KEY
		)
		return res.status(200).json({
			id,
			username,
			token
		});
	}catch(err){
		if(err.code===11000){
			err.message="Sorry, that username and/or email is taken";
		}
		return next({
			status:400,
			message:err.message
		})
	}
}
