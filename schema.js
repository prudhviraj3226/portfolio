var mongoose = require('mongoose');


var profileSchema =new mongoose.Schema({

_id:{
	type:String,
	required:true
},
skillset:{
	
	type:String
},
username:{
	type:String
},
password:{
	type:String
},
doj:{
	type:String
},
phonenumber:{
	type:String
},
uploadimage:{
	type:String
},
status:{
	type:String
},
project:{
	type:String
},
resourcetype:{
	type:String
}

});

module.exports=mongoose.model('profiles',profileSchema);
