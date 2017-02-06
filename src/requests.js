//var nocache = require('superagent-no-cache');
import request from  'superagent';
import Promise from 'bluebird';

//var prefix = require('superagent-prefix')('/static');
var root = 'https://jsonplaceholder.typicode.com';
// var goback = 'http://localhost:8080';
var goServer = process.env.GO_ADDR;

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
		  .get(goServer+'/patients/patientuuid/2779123f-f4c3-43ec-b20a-a6fcbb0eb418')
		  .end(function(err, res){
		    if(!err && res.ok){
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
		  .get(goServer+'/patients/doctoruuid/4498720b-0491-424f-8e52-6e13bd33da71')
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
		  .get(goServer+'/appointments/doctoruuid/4498720b-0491-424f-8e52-6e13bd33da71')
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
		   		name: email,
		   		pass: pass
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

export default {
	authenticate:authenticate,
	testApi:getTest,
	patientSearch:patientSearch,
	patientsByDocSearch:patientsByDocSearch,
	appointmentsByDocSearch:appointmentsByDocSearch,
	updatePatient:updatePatient
};
