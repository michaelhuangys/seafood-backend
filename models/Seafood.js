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
         imageUrl:{
               type:[String]
          }
     },{
          timestamps:true
     }
)



const Seafood=mongoose.model('Seafood',seafoodSchema);
module.exports=Seafood;
