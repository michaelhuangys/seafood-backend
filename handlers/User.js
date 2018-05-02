const db=require('../models');
const JSON = require('circular-json');
// /users/:id/chart/:seafoodId
exports.addSeafood=async function(req,res,next){
    try{
        console.log(req.originalUrl +' add seafood '+req.params.id+"  "+req.params.seafoodId);
        let foundUser=await db.User.findById(req.params.id);
        console.log(foundUser.email);
        foundUser.cart.push(req.params.seafoodId);
        await foundUser.save();
        return res.status(200).json(foundUser);
    }catch(err){
        return next(err);
    }
}

// /users/:id/chart/:seafoodId
exports.deleteSeafood=async function(req,res,next){
    try{
        console.log(req.originalUrl +' delete seafood '+req.params.id);
        let foundUser=await db.User.findById(req.params.id);
        foundUser.cart.remove(req.params.seafoodId);
        await foundUser.save();
        return res.status(200).json(foundUser);
    }catch(err){
        return next(err);
    }
}

// /users/:id/cart
exports.getSeafood=async function(req,res,next){
    try{
        console.log(req.originalUrl +' get seafood '+req.params.id);
        let foundUser = await db.User.findById(req.params.id);
        let seafoodIds=foundUser.cart;
        let seafood=await db.Seafood.find({_id:{$in:seafoodIds}});
        return res.status(200).json(seafood);
    }catch(err){
        return next(err);
    }
}


// /users
exports.users=async function(req,res,next){
    try{
        let users=await db.User.find();
        return res.status(200).json(users);
    }catch(e){
        return next(e);
    }
}
