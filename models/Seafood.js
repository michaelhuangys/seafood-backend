const mongoose=require('mongoose');
const User=require('./User');

const seafoodSchema=new mongoose.Schema(
     {
     	name:{
     		type:String,
     		required:true,
     		maxLength:30
     	},
     	description:{
     		type:String,
     		required:true,
     		maxLength:200
     	},
          profileImageUrl:{
               type:String
          }
     },{
          timestamps:true
     }
)


seafoodSchema.pre('remove',async function(next){
	try{
		let user=await User.findById(this.user);
		user.seafood.remove(this.id);
		await user.save();
		return next();
	}catch(err){
		return next(err);
	}
})

const Seafood=mongoose.model('Seafood',seafoodSchema);
module.exports=Seafood;
