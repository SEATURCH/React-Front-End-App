//var nocache = require('superagent-no-cache');
import request from  'superagent';
import Promise from 'bluebird';

//var prefix = require('superagent-prefix')('/static');
var root = 'https://jsonplaceholder.typicode.com';
// var goback = 'http://localhost:8080';
var goServer = process.env.GO_ADDR;

var whoami = function(){
	var userUUID = sessionStorage.userUUID;
	var user;
	return function(currentUser){
		if(currentUser)
			user = currentUser
		if(!user){
			console.log("NOUSER")
			return new Promise(function(resolve, reject){
				// request
				//   .get(root+'/posts/'+id)
				//   .withCredentials()
				//   .end(function(err, res){
				//     if(!err && res.ok){
				//     	resolve(res.body);
				//     }else {
				//     	reject();
				//     }

			 //  	});
				user = {
					role: "Doctor",
					uuid: userUUID
				}
				resolve(user);
			}); 
		} else{
			return user;
		}
	}
}();

var getTest = function(id){
	return new Promise(function(resolve, reject){
		request
		  .get(root+'/posts/'+id)
		  .withCredentials()
		  .end(function(err, res){
		    if(!err && res.ok){
		    	resolve(res.body);
		    }else {
		    	reject();
		    }

	  	});
	});
}

var patientSearch = function(id){
	return new Promise(function(resolve, reject){
		request
		  .get(goServer+'/patients/patientuuid/'+id)
		  .end(function(err, res){
		    //if(!err && res.ok){
				if(res.code !== 400 || res.code !== 404){
					resolve(res.body);
				}else {
					reject();
		    }
			});
		});
}

var patientsByDocSearch = function(id){
	return new Promise(function(resolve, reject){
		request
		  .get(goServer+'/patients/doctoruuid/'+sessionStorage.userUUID)
		  .end(function(err, res){
		    if(!err && res.ok){
					resolve(res.body);
				}else {
					reject();
		    }
			});
		});
}

var appointmentsByDocSearch = function(id){
	return new Promise(function(resolve, reject){
		request
		  .get(goServer+'/appointments/doctoruuid/'+sessionStorage.userUUID)
		  .end(function(err, res){
		    if(!err && res.ok){
					resolve(res.body);
				}else {
					reject();
		    }
			});
		});
}

var authenticate = function(email, pass) {
    if (sessionStorage.token) {
      	delete sessionStorage.token;
    }

    return new Promise(function(resolve, reject){
		request
		   .post(goServer + '/login')
		   .type('form')
		   .send({
		   		userName: email,
		   		passWord: pass
		   })
		  .end(function(err, res){
		    if(!err && res.ok){
		    	sessionStorage.userUUID = res.body.userUUID;
		    	whoami({
					role: "Doctor",
					uuid: res.body.userUUID
				});
		    	resolve(res.ok );
		    } else {
		    	reject();
		    }
	  	});
	});
  }

var updatePatient = function(patient){
	return new Promise(function(resolve, reject){
		request
		   .post(goServer + '/update/patient')
		   .type('form')
		   .send({
		   		patientuuid: patient.patientuuid,
		   		notes: patient.notes
		   })
		  .end(function(err, res){
		    if(!err && res.ok){
		    	resolve(res.ok );
		    }else {
		    	reject();
		    }
	  	});
	});
}

var appointmentsByPatientSearch = function(patientId){
	return new Promise(function(resolve, reject){
		request
		  .get(goServer+'/appointments/patientuuid/' + patientId)
		  .end(function(err, res){
		    if(!err && res.ok){
					resolve(res.body);
				}else {
					reject();
		    }
			});
		});
}

var getPatientDashboard = function(patientId){
	var promises = [
		new Promise(function(resolve, reject){
			request
			  .get(goServer+'/patients/patientuuid/'+patientId)
			  .end(function(err, res){
			    	if(res.code !== 400 || res.code !== 404){
						resolve({
							name: "generalInfoList",
							value: res.body
						});
					}else {
						reject();
			    }
				});
			}),
		new Promise(function(resolve, reject){
			request
			  .get(goServer+'/appointments/patientuuid/' + patientId)
			  .end(function(err, res){
			    if(!err && res.ok){
						resolve({
							name: "appointmentList",
							value: res.body
						});
					}else {
						reject();
			    }
				})
		  	}),
		new Promise(function(resolve, reject){
			request
			  .get(goServer+'/prescriptions/patientuuid/' + patientId)
			  .end(function(err, res){
			    if(!err && res.ok){
						resolve({
							name: "prescriptionList",
							value: res.body
						});
					}else {
						reject();
			    }
				})
		  	})
	];

	return new Promise(function(resolve, reject){
		Promise.all(promises.map(function(promise) {
			return promise.reflect();
		})).then(function(res){
			var resolved = {};
			res.forEach(function(inspection){
				console.log(inspection.value());
				var value = inspection.value();
				if(inspection.isFulfilled()){
					resolved[value.name] = value.value;
				}else{
					resolved[value.name] = "Error, Promise rejected";
				}
			});
			sessionStorage.currentPatient = patientId;
			resolve(resolved);
		});
	});
}

export default {
	whoami: whoami,
	authenticate:authenticate,
	testApi:getTest,
	patientSearch:patientSearch,
	patientsByDocSearch:patientsByDocSearch,
	appointmentsByDocSearch:appointmentsByDocSearch,
	updatePatient:updatePatient,
	getPatientDashboard: getPatientDashboard
};
