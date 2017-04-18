var express= require("express");

var session		=	require('express-session');

var bodyParser = require('body-parser');


var mongoose = require('mongoose');

var multer = require('multer');

var upload = multer({ dest: './public/images/portfolio' });



var app=express();


app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(express.static(__dirname+'/public'));




mongoose.connect('mongodb://localhost:27017/PortfolioDB',function(err){
	console.log("connected");
});


var db = require('./schema.js');

var projectdb = require('./projectSchema.js');





app.get('/',function(req,res){
	res.redirect('/LOGIN');
});


app.get('/LOGIN',function(req,res){
  res.sendFile(__dirname+'/public/Login.html');
});




app.get('/totalemployees',function(req,res){
  res.sendFile(__dirname+'/public/totalemployees.html');
});

app.get('/Registration',function(req,res){
  res.sendFile(__dirname+'/public/Registration.html');
});

app.get('/addproject',function(req,res){
  res.sendFile(__dirname+'/public/addproject.html');
});


app.get('/indexmanager',function(req,res){
  res.sendFile(__dirname+'/public/indexmanager.html');
});


app.get('/extraprojects',function(req,res){
  res.sendFile(__dirname+'/public/extras-projects.html');
});

app.get('/extratasks',function(req,res){
  res.sendFile(__dirname+'/public/extras-taskboard.html');
});



app.get('/availableresources',function(req,res){
  res.sendFile(__dirname+'/public/availableresources.html');
});


app.get('/allocatedresources',function(req,res){
  res.sendFile(__dirname+'/public/projectresources.html');
});

app.get('/totalemployeesinproject',function(req,res){
  res.sendFile(__dirname+'/public/totalemployeesinproject.html');
});


app.get('/profile',function(req,res){
  res.sendFile(__dirname+'/public/index.html');
});

app.get('/managerprofile',function(req,res){
  res.sendFile(__dirname+'/public/indexmanager.html');
});

app.get('/editprojectresources',function(req,res){
  res.sendFile(__dirname+'/public/editprojectresources.html');
});

app.get('/deleteproject',function(req,res){
  res.sendFile(__dirname+'/public/deleteproject.html');
});


app.post('/log',function(req,res){
	
	if(req.body._id!=undefined)
	{
		
					
				var json={
					"_id":req.body._id,
					"password":req.body.password
				};	
	
	console.log("cred"+JSON.stringify(json))
	
			logData(json,function(err,data)
			{
						if(err)
						{
						res.send(err);
						}
				else
				{
						if(data.length)
						{
							  if(req.body._id==data[0]._id&&req.body.password==data[0].password)
							 {
								 console.log("ok"+JSON.stringify(data))
								 res.json(data[0].skillset);
							
							 }
							 else
							 {
							 res.send("Wrong crediatials1");	
							  }
						}
							else
								{
									res.send("Wrong crediatials");
								}
				}
			})
			
			


	
	}
	
			
	
});


var logData=function(json,callback){
		db.find(json,function(err,data){
			
  callback(err,data);
});
};







app.post('/RegisterEmployee',upload.single('uploadimage'),function(req,res){
	
	
	
		var id=req.body.gmailid;
		var username=req.body.username;
		var password=req.body.password;
		var phonenumber=req.body.phonenumber;
		var doj=req.body.doj;
		var skillset=req.body.skillset;
		
	
	if(req.file){
	    var uploadimage = req.file.filename
	  } else {
	    var uploadimage = 'noimage.jpg';
	  }
	  
	  
	  var json  = {
	        _id: id,
	        username: username,
	        password: password,
	        phonenumber: phonenumber,
	        doj: doj,
	        skillset: skillset,
	        uploadimage: uploadimage,
			status:"0",
			project:"BENCH",
			resourcetype:"BENCH"
	      }
	
	
console.log(JSON.stringify(json))

	regempdata(json,function(err,data)
	{
		if(err)
		{
		res.redirect('/gf');
		}
		else{
			res.redirect('/LOGIN');
		}
	})
	
	
});

var regempdata=function(json,callback){
		db.create(json,function(err,data){
  callback(err,data);
});
};



app.post('/totalemployees',function(req,res){
	
		var json={
		"_id":req.body._id
	};
		db.find({},function(err,data)
			{
 
		
		
		if (data.length) {
          response = {
                "result": data
            }
			console.log(response);
            res.json(response);
        } else {
          error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
		
		
		
	})		
	
});



app.post('/availableresources',function(req,res){
	
		var json={
		"skillset":req.body.skillset,
		"status":"0"
	};
		db.find(json,function(err,data)
			{
 
		
		
		if (data.length) {
          response = {
                "result": data
            }
			console.log(response);
            res.json(response);
        } else {
          error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
		
		
		
	})		
	
});

app.post('/allocatedresources',function(req,res){
	
		var json={
		"skillset":req.body.skillset,
		"status":"1"
	};
		db.find(json,function(err,data)
			{
 
		
		
		if (data.length) {
          response = {
                "result": data
            }
			console.log(response);
            res.json(response);
        } else {
          error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
		
		
		
	})		
	
});

app.post('/updateavailableresources',function(req,res){
	
	var json1={
		"_id":req.body._id
	};
	  
	var json={
	
		
		 "status":"1",
		 "project":req.body.project,
		 "resourcetype":req.body.resourcetype
		 
	};
	

			db.findOneAndUpdate(json1,json, { new: true },function(err,data)
			{
 
		if(err)
		{
			console.log("err"+err);
		res.json(err);
		}
		else{
			
			
			console.log("data"+JSON.stringify(data));
		res.json(data)
			
			
		}
	})
	
});


app.post('/addproject',function(req,res){
	
	
	
	var json={
		"_id":req.body._id,
		"projectstartdate":req.body.startdate,
		"manager":req.body.manager,
		"employees":req.body.employeename
	
		
	};
	

	
			
			addprojectData(json,function(err,data)
	{
		if(err)
		{
		res.send(err);
		}
		else{
			res.send(data);
		}
	})
			
	

	
	
	
});

var addprojectData=function(json,callback){
		projectdb.create(json,function(err,data){
  callback(err,data);
});
};



app.post('/deleteproject',function(req,res){
	
	
	
	var json={
		"_id":req.body._id
		
	};
	

	


	deleteprojectData(json,function(err,data)
	{
		if(err)
		{
		res.send(err);
		}
		else{
			res.send(data);
		}
	})
	
	
});

var deleteprojectData=function(json,callback){
		projectdb.remove(json,function(err,data){
  callback(err,data);
});
};


app.post('/updateproject',function(req,res){
	
	var json1={
		"_id":req.body._id
	};
	  
	var json={
	
		
		 "projectstartdate":req.body.projectstartdate,
		 "employees":[{"name":req.body.name}]

	};
	

			projectdb.findOneAndUpdate(json1,json, { new: true },function(err,data)
			{
 
		if(err)
		{
			console.log("err"+err);
		res.json(err);
		}
		else{
			
			
			console.log("data"+JSON.stringify(data));
		res.json(data)
			
			
		}
	})
	
});



app.post('/totalemployeesinproject',function(req,res){
	
	
	
	
		var json={
		"_id":req.body._id
		
	};
		projectdb.find(json,function(err,data)
			{
 
		
		
		if (data.length) {
          response = {
                "result": data
            }
			console.log(response);
            res.json(response);
        } else {
          error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
		
		
		
	})		
	
});



app.post('/profile',function(req,res){
	
		var json={
		"_id":req.body._id
	};
db.find({},function(err,data)
			{
 
		
		
		if (data.length) {
			console.log("shh"+JSON.stringify(data))
			
			db.find({"_id":req.body._id},function(err,data)
			{
 
		if(err)
		{
		res.json(err);
		}
		else{
			console.log("hello"+JSON.stringify(data))
			res.json(data);
		}
	})
          
            
			
            
        } else {
          
            res.json(err);
        }
		
		
		
	})		
	
});


app.post('/managerprofile',function(req,res){
	
		var json={
		"manager":req.body.manager
	};
projectdb.find({},function(err,data)
			{
 
		
		
		if (data.length) {
			console.log("shh"+JSON.stringify(data))
			
			projectdb.find(json,function(err,data)
			{
 
		if(err)
		{
		res.json(err);
		}
		else{
			
			response = {
                "result": data
            }
			console.log("hello"+JSON.stringify(data))
			res.json(response);
		}
	})
          
            
			
            
        } else {
          
            res.json(err);
        }
		
		
		
	})		
	
});



app.post('/editprojectresources',function(req,res){
	
	var json1={
		"_id":req.body.projectname
	};
	  
	var json={
	
		
"_id":req.body.gmailid
	};
	
	var json2={
	
		
		 "status":"0",
		 "project":"BENCH"
		 
	};
	 projectdb.update({"_id":req.body.projectname},{ $pull: { employees: {"_id":req.body.gmailid  } } },function(err,data)

			{
 
		
		
		if (err) {
			var error={
				err:"erroorr"
			}
		
		res.json(error);	
			
		
			
			
			
			
			
		} else {
          
            	console.log("guru"+JSON.stringify(data))
				
				
				
				 db.findOneAndUpdate(json,json2, { new: true },function(err,data)
   {
    
    
 
  if(err)
  {
   console.log("err"+err);
  res.json(err);
  }
  else{
   
   
   console.log("data"+JSON.stringify(data));
  res.json(data)
   
   
  }
 })
				
				
				
				
				
				
				
				
				
				
				
		
        }
		
		
		
	})	
	

		
	
});



app.post('/updateprojectdetails',function(req,res){
	
	var json1={
		"_id":req.body.projectname
	};
	  
	var json={
	
		
"employees":req.body.employeename
	};
	

	 projectdb.update({"_id":req.body.projectname},{ $push: { "employees": req.body.employeename } },function(err,data)

			{
 
		
		
		if (err) {
			var error={
				err:"erroorr"
			}
		
		res.json(error);	
			
		
			
			
			
			
			
		} else {
        }
		
		
		
	})	
	

		
	
});















app.post('/updatechangeresources',function(req,res){
	
	var json={
		"_id":req.body._id
	};
	  
	var json1={
	
		
		 "status":"0",
		 "project":"BENCH"
		 
	};
	

			db.findOneAndUpdate(json,json1, { new: true },function(err,data)
			{
 
		if(err)
		{
			console.log("err"+err);
		res.json(err);
		}
		else{
			
			
			console.log("data"+JSON.stringify(data));
		res.json(data)
			
			
		}
	})
	
});







app.post('/totalbillableresourcesinproject',function(req,res){
	json=
	{
		"project":req.body._id,
		"resourcetype":"BILLABLE"
	}
	
		db.find(json,function(err,data)
			{
 
		
		
		if (data.length) {
          response = {
                "result": data
            }
			console.log(response);
            res.json(response);
        } else {
          error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
		
		
		
	})		
	
});


app.post('/totalshadowresourcesinproject',function(req,res){
	
		json=
	{
		"project":req.body._id,
		"resourcetype":"SHADOW"
	}
db.find(json,function(err,data)
			{
 
		
		
		if (data.length) {
          response = {
                "result": data
            }
			console.log(response);
            res.json(response);
        } else {
          error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
		
		
		
	})		
	
});


app.post('/totalbenchresources',function(req,res){
	
		json=
	{
		"project":"BENCH",
		"resourcetype":"BENCH"
	}
db.find(
		{	"project":"BENCH",
		"resourcetype":"BENCH",
	"skillset":{$ne:"manager"}},function(err,data)
			{
 
		
		if (data.length) {
          response = {
                "result": data
            }
			console.log(response);
            res.json(response);
        } else {
          error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
		
		
		
	})		
	
});


app.post('/totalprojects',function(req,res){
	
	
	
	
		
		projectdb.find({},function(err,data)
			{
 
		
		
		if (data.length) {
          response = {
                "result": data
            }
			console.log(response);
            res.json(response);
        } else {
          error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
		
		
		
	})		
	
});





app.listen(process.env.PORT || 8000);

console.log("Application is Running");