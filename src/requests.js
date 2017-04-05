//var nocache = require('superagent-no-cache');
import request from  'superagent';
import Promise from 'bluebird';
import PDFJS from 'pdfjs-dist'

//var prefix = require('superagent-prefix')('/static');
var root = 'https://jsonplaceholder.typicode.com';
// var goback = 'http://localhost:8080';
//var goServer = process.env.GO_ADDR;
var goServer = "http://localhost:8080";

var whoami = function(){
	var userUUID = sessionStorage.userUUID;
	var user;
	return function(currentUser){
		if(currentUser)
			user = currentUser

		if(!user){
			return new Promise(function(resolve, reject){
				request
				  .get(goServer+'/users/useruuid/'+userUUID)
				  .end(function(err, res){
				    if(!err && res.ok){
				    	user = {
				    		name: res.body.name,
							role: res.body.role,
							uuid: res.body.userUUID
						}
						resolve(user);
				    }else {
				    	reject();
				    }
			  	});
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

var patientsByDocSearch = function(){
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

var getNotificationPageLists = function() {
	var promises = [
		new Promise(function(resolve, reject){
			request
			  .get(goServer + '/notifications/doctoruuid/' + sessionStorage.userUUID)
			  .end(function(err, res){
			    	if(!err && res.ok){
						resolve({
							name: "notificationsList",
							value: res.body
						});
					}else {
						reject();
			    	}
				});
			}),
			new Promise(function(resolve, reject){
				request
				  .get(goServer + '/doctors')
				  .end(function(err, res){
				    if(!err && res.ok){
						resolve({
							name: "doctorsList",
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
				var value = inspection.value();
				if(inspection.isFulfilled()){
					resolved[value.name] = value.value;
				}else{
					resolved[value.name] = "Error, Promise rejected";
				}
			});
			resolve(resolved);
		});
	});
}

var postNotification = function(notification){
	return new Promise(function(resolve, reject){
		request
		   .post(goServer + '/notifications')
		   .type('json')
		   .send(notification)
		   .end(function(err, res){
		   	if(!err && res.ok){
		    	resolve(res.ok);
		    }else {
		    	reject();
		    }
	  	});
	});
}

var postFutureAppointment = function(appointment){
	return new Promise(function(resolve, reject){
		request
		   .post(goServer + '/futureappointments')
		   .type('json')
		   .send(appointment)
		   .end(function(err, res){
		   	if(!err && res.ok){
		    	resolve(res.ok);
		    }else {
		    	reject();
		    }
	  	});
	});
}

var deleteFutureAppointment = function(appointmentuuid){
	return new Promise(function(resolve, reject){
		request
		   .delete(goServer + '/futureappointments/appointmentuuid/' + appointmentuuid)
		   .end(function(err, res){
		   	if(!err && res.ok){
		   		resolve(res.ok);
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
		   		username: email,
		   		password: pass
		   })
		  .end(function(err, res){
		    if(!err && res.ok){
		    	sessionStorage.userUUID = res.body.userUUID;
		    	whoami({
		    		name: res.body.name,
					role: res.body.role,
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
		   .put(goServer + '/patients')
		   .type('json')
		   .send(patient)
		   .end(function(err, res){
		   	if(!err && res.ok){
		    	resolve(res.ok);
		    }else {
		    	reject();
		    }
	  	});
	});
}

var createPatient = function(patient){
	return new Promise(function(resolve, reject){
		request
		   .post(goServer + '/patients')
		   .type('json')
		   .send(patient)
		   .end(function(err, res){
		   	if(!err && res.ok){
		    	resolve(res.body);
		    }else {
		    	reject();
		    }
	  	});
	});
}

var patientListGet = function(){
	return new Promise(function(resolve, reject){
		request
		   .get(goServer + '/patients/all')
		   .end(function(err, res){
		   	if(!err && res.ok){
		    	resolve(res.body);
		    }else {
		    	reject();
		    }
	  	});
	});
}

var updateAppointment = function(apptId, appointment, prescriptions){
	var promises = [
		new Promise(function(resolve, reject){
			request
		  	.post(goServer+'/completedappointments')
		  	.send(appointment)
		  	.end(function(err, res){
			    if(!err && res.ok){
					resolve({
						name: "completedappointments",
						value: res.body
					});
				} else {
						reject();
			    }
			});
		}),
		new Promise(function(resolve, reject){
			request
			.post(goServer+'/prescription')
			.send(prescriptions)
			.end(function(err, res){
				if(!err && res.ok){
					resolve({
						name: "prescriptions",
						value: res.body
					});
				} else {
						reject();
			    }
			});
		})
	];

	return new Promise(function(resolve, reject){
		Promise.all(promises.map(function(promise) {
			return promise.reflect();
		})).then(function(res){
			var resolved = {};
			res.forEach(function(inspection){
				var value = inspection.value();
				if(inspection.isFulfilled()){
					resolved[value.name] = value.value;
				}else{
					resolved[value.name] = "Error, Promise rejected";
				}
			});
			resolve(resolved);
		});
	});
}

var getPatientAppointment = function(appointmentuuid, patientId) {
	var promises = [
		new Promise(function(resolve, reject){
			request
			  .get(goServer+'/completedappointments/appointmentuuid/'+appointmentuuid)
			  .end(function(err, res){
			  		var apptObj = {
			  			name: "appointmentDetail",
			  			value: {}
			  		};
			  		if(!err && res.ok){
						apptObj.value = res.body;
					}
					resolve(apptObj);
				});
			}),
		new Promise(function(resolve, reject){
			request
			  .get(goServer+'/patients/patientuuid/'+patientId)
			  .end(function(err, res){
			    	if(!err && res.ok){
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
				var value = inspection.value();
				if(inspection.isFulfilled()){
					resolved[value.name] = value.value;
				}else{
					resolved[value.name] = "Error, Promise rejected";
				}
			});
			resolve(resolved);
		});
	});
}

var getPatientDashboard = function(patientId){
	var promises = [
		new Promise(function(resolve, reject){
			request
			  .get(goServer+'/patients/patientuuid/'+patientId)
			  .end(function(err, res){
			    	if(!err && res.ok){
			    		sessionStorage.currentPatient = patientId;
			    		sessionStorage.currentPatientName =  res.body.name;
						resolve({
							name: "generalInfoList",
							value: res.body
						});
					} else {
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
				var value = inspection.value();
				if(inspection.isFulfilled()){
					resolved[value.name] = value.value;
				}else{
					resolved[value.name] = "Error, Promise rejected";
				}
			});
			resolve(resolved);
		});
	});
}

var uploadDocument = function(file, patientuuid, dateUploaded){
	return new Promise(function(resolve, reject){
		request
		   .post(goServer + '/documents')
		   .field("dateUploaded", dateUploaded )
		   .field("filename", file.name)
		   .field("patientUUID", patientuuid)
		   .attach("file",file)
		   .end(function(err, res){
		   	if(!err){
		    	resolve(res.body)
		    }else {
		    	reject();
		    }
	  	});
	});
}

var documentList = function(patientuuid){
	return new Promise(function(resolve, reject){
		request
		   .get(goServer + '/documents/patientuuid/'+patientuuid)
		   .end(function(err, res){
		   	if(!err && res.ok){
		    	resolve(res.body);
		    }else {
		    	reject();
		    }
	  	});
	});
}

var getDocument = function(documentuuid){
	return PDFJS.getDocument(goServer + '/documents/documentuuid/'+documentuuid)
}

var createPatientProfile = function(userProfile){
	return new Promise(function(resolve, reject){
		request
		   .post(goServer + '/users')
		   .send(userProfile)
		   .end(function(err, res){
		   	if(!err && res.ok){
		   		sessionStorage.userUUID = res.body.userUUID;
	   			whoami({
		    		name: res.body.name,
					role: res.body.role,
					uuid: res.body.userUUID
				});
				resolve(res.ok);
			}else {
		    	reject(res.body);
		    	reject();
		    }
	  	});
	});
}

var createDoctorProfile = function(userProfile, doctorProfile){
	return new Promise(function(resolve, reject){
		request
		   .post(goServer + '/users')
		   .send(userProfile)
		   .end(function(err, res){
		   		if(!err && res.ok){
	   			   	resolve(res.body)
			    } else {
			    	reject(res.body);
			    }
	  	});
	}).then(function (res) {
		return new Promise(function(resolve, reject){
		   	doctorProfile.doctorUUID = res.userUUID;
		   		var user = {
	    		name: res.name,
				role: res.role,
				uuid: res.userUUID
			};
			request
			   .post(goServer + '/doctors')
			   .send(doctorProfile)
			   .end(function(err, res){
			   		if(!err && res.ok){
			   			sessionStorage.userUUID = res.userUUID;
						whoami(user);
						resolve(res.ok);
					} else {
						reject();
					}
				});
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
	getNotificationPageLists:getNotificationPageLists,
	postNotification:postNotification,
	postFutureAppointment:postFutureAppointment,
	deleteFutureAppointment:deleteFutureAppointment,
	updatePatient:updatePatient,
	createPatient:createPatient,
	getPatientDashboard: getPatientDashboard,
	getPatientAppointment: getPatientAppointment,
	uploadDocument:uploadDocument,
	documentList:documentList,
	getDocument:getDocument,
	updateAppointment:updateAppointment,
	createDoctorProfile:createDoctorProfile,
	createPatientProfile:createPatientProfile,
	createPatient:createPatient,
	patientListGet:patientListGet
};
