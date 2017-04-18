var mongoose = require('mongoose');


var projectSchema =new mongoose.Schema({

_id:{
	type:String,
	required:true
},
projectstartdate:{
	
	type:String
},

manager:{
	
	type:String
},
employees:{
type:[{}]
}



});

module.exports=mongoose.model('projects',projectSchema);
