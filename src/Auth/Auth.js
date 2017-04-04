import React, {Component } from 'react';
import req from '../requests.js'
import Comp from './CustomComp.js'
import { browserHistory } from 'react-router'

function requireAuth(nextState, replace) {
  if (sessionStorage.token !== 'true') {
  	replace({
      pathname: '/login'
    })
  }
}


class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
	        error: false,
	        patientError: false,
	        createUserError: false,
	        // No current licenseError returns
	        // No software distrbution policy discussed
	        licenseError: false,
	        next: false,
	        pMatch:false,
	        role: "Doctor",
	        gender: 'male'
	    }
	}

	handleSubmit(event) {
	 	event.preventDefault()
		const email = this.refs.email.value.toLowerCase()
		const pass = this.refs.pass.value
		req.authenticate(email, pass)
			.then((res) => {
				sessionStorage.token = res;
				if(req.whoami().role === "Doctor"){
					browserHistory.push('/Schedule');
				} else {
					browserHistory.push('/Dashboard');
				}
				this.props.upp(true);
			}).catch((res) => {
				this.setState({error:true});
				this.refs.pass.value = '';
				console.log("Could not mount")
			});
    }
    
    radioClick(event){
    	this.setState({role:event.target.id})
    }
    
    genderSel(event){
    	this.setState({gender:event.target.id})
    }

    nextClick(event){
    	event.preventDefault();
    	var haserror = this.refs.newUsername.checkValidation() || this.refs.newPassword.checkValidation();
    	if(this.refs.newPassword.getValue() !== this.refs.repPassword.getValue())
    		this.setState({pMatch:true})
    	else if(!haserror)
    		this.setState({next:event.target.id})
    }
    
    backClick(event){
    	this.setState({next:event.target.id})	
    }
    
    createSubmit(event){
    	var haserror = false;
    	var profile = {
			name: (this.refs.name)? this.refs.name.getValue().toLowerCase() : "",
			userName:this.refs.newUsername.getValue(),
			passWord:this.refs.newPassword.getValue(),
			role: this.state.role,
			verificationKey: this.refs.verificationKey.getValue()
		};

    	if(this.state.role ==="Doctor"){
    		haserror = this.refs.name.checkValidation() || this.refs.phoneNumber.checkValidation() || this.refs.phoneNumber.checkValidation()
	    		|| this.refs.prFacility.checkValidation() || this.refs.prSpecialty.checkValidation() ||  this.refs.verificationKey.checkValidation();
    		if (!haserror) {
	    		var doctorProfile = {
	    			name: this.refs.name.getValue(),
					phoneNumber: this.refs.phoneNumber.getValue(),
					primaryFacility: this.refs.prFacility.getValue(),
					primarySpecialty: this.refs.prSpecialty.getValue(),
					gender: this.state.gender
	    		}
	    		req.createDoctorProfile(profile, doctorProfile)
					.then((res) => {
						sessionStorage.token = res;
						browserHistory.push('/Schedule');
						this.props.upp(true);
					}).catch((res) => {
						if (res.createUserError)
							res.next = false;
						this.setState(res);
						console.log("Could not create user entry for a doctor");
					});
	    	}
	    } else {
	    	haserror = this.refs.verificationKey.checkValidation();
	    	if (!haserror) {
    		req.createPatientProfile(profile)
				.then((res) => {
					sessionStorage.token = res;
					browserHistory.push('/Dashboard?id='+req.whoami().uuid);
					this.props.upp(true);
				}).catch((res) => {
					if (res.createUserError)
						res.next = false;
					this.setState(res);
					console.log("Could not create user entry for patient");
				});
    		}
	    }
	    
    }
	
	render(){
		var gender = this.state.gender.toLowerCase();
		return (
		<div id="Login">
			<div className="signIn">
				<h2>Sign In</h2>
		        <div>
					<label><input ref="email" placeholder="email" /></label>
					<label><input type="password" ref="pass" placeholder="password" /></label>
					<br />
					<button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Login</button>
					{this.state.error && (
						<p>Incorrect username or password</p>
					)}
				</div>
	        </div>
	        <div className="createUser">
	        	<h2>Create Account</h2>
	        		<div style={{opacity:(!this.state.next)?"1": "0"}} className="inputPanel authInput">
		        		<div className="btn-group" data-toggle="buttons">
		        		  <label style={{opacity:(this.state.role ==="Doctor")?"1":"0.5"}} className="btn btn-primary">
						    <input type="radio" id="Doctor" onClick={this.radioClick.bind(this)} /> Doctor
						  </label>
						  <label style={{opacity:(this.state.role ==="Doctor")?"0.5":"1"}} className="btn btn-primary">
						    <input type="radio" id="Patient" onClick={this.radioClick.bind(this)} />Patient
						  </label>
						</div>
		    			<Comp.ValidatedInput ref="newUsername"
		  					validation="required" label="User Name" name="username" type="text"
		  					value="" errorHelp={{
		    					required:"Username Required"
		    				}} />
						<Comp.ValidatedInput ref="newPassword"
		  					validation="required" label="Password" name="password" type="password" 
		  					value="" errorHelp={{
		    					required:"Password Required"
		    				}} />
		    			<Comp.ValidatedInput ref="repPassword"
		  					validation="required" label="Password" name="password" type="password" 
		  					value="" />
		    			<button className="btn btn-primary" id="true" onClick={this.nextClick.bind(this)}>Next</button>
		    			{this.state.pMatch &&(<p style={{color:"#a94442"}}>Passwords do not match</p>)}
		    			{this.state.createUserError &&(<p style={{color:"#a94442"}}>Username not available</p>)}
		    		</div>
		    		<div style={{left:(!this.state.next)?"100%": "0"}} className="inputPanel detailsInput">
		    			{ this.state.role ==="Doctor"  && (
	    				<div>
		    				<Comp.ValidatedInput ref="name"
			  					validation="required" label="Name" name="name" type="text" 
			  					value="" errorHelp={{
			    					required:"Name Required"
			    				}} />
		    				<div className="btn-group" data-toggle="buttons">
			        		 	<label style={{opacity:(gender === "male" || gender === "m" )?"1":"0.5"}} className="btn btn-primary">
							    	<input type="radio" id="male" onClick={this.genderSel.bind(this)} />Male
							  	</label>
							  	<label style={{opacity:(gender === "female" || gender === "f")?"1":"0.5"}} className="btn btn-primary">
							    	<input type="radio" id="female" onClick={this.genderSel.bind(this)} />Female
							  	</label>
							</div>
			    			<Comp.ValidatedInput ref="phoneNumber"
			  					validation="required" label="Phone Number" name="phoneNumber" type="text" 
			  					value="" errorHelp={{
			    					required:"Required"
			    				}} />
			    			<Comp.ValidatedInput ref="prFacility"
			  					validation="required" label="Primary Facility" name="prFacility" type="text" 
			  					value="" errorHelp={{
			    					required:"Required"
			    				}} />
			    			<Comp.ValidatedInput ref="prSpecialty"
			  					validation="required" label="Primary Specialty" name="prSpecialty" type="text" 
			  					value="" />
			    			<Comp.ValidatedInput ref="verificationKey"
			  					validation="required" label="Access Key" name="accessKey" type="text" 
			  					value="" />
			  				{this.state.licenseError &&(<p style={{color:"#a94442"}}>Unable to create user</p>)}
	  					</div>
		    			)}
	    				{ this.state.role !== "Doctor"  && (
						<div>
			    			<Comp.ValidatedInput ref="verificationKey"
			  					validation="required" label="Medical Number" name="medicalNumber" type="text" 
			  					value="" errorHelp={{
			    					required:"Medical Number Required"
			    				}} />
			    			{this.state.patientError &&(<p style={{color:"#a94442"}}>Unable to create user</p>)}
			    		</div>
	    				)}
	    				<button style={{float:"left"}} className="btn btn-default" onClick={this.backClick.bind(this)}>Back</button>
		    			<button style={{float:"right"}} onClick={this.createSubmit.bind(this)} className="btn btn-primary">Submit</button>
		    		</div>
	        </div>
        </div>
      );
	}
}


class Logout extends Component {
	componentDidMount() {
		delete sessionStorage.token;
		this.props.upp(false);
	}
	render(){
		return (
			<div>You have been successfully logged out</div>
		);
	}
}

export default {
	Logout: Logout,
	Login: Login,
	requireAuth:requireAuth
};
