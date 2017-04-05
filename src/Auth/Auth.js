import React, {Component } from 'react';
import req from '../requests.js'
import Comp from './CustomComp.js'
import { browserHistory } from 'react-router'

// Rerouting to redirect any non authenticated access to login page
function requireAuth(nextState, replace) {
  if (sessionStorage.token !== 'true') {
  	replace({
      pathname: '/login'
    })
  }
}

// Login component includes the login and create user component
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

			newUsername:"",
			newPassword:"",
			repPassword:"",
			name:"",
			phoneNumber:"",
			prFacility:"",
			prSpecialty:"",
			verificationKey:"",
	        role: "Doctor",
	        gender: 'male'
	    }
	}

	currentStateObject(){
		return {
			newUsername: (this.refs.newUsername)? this.refs.newUsername.getValue() : "",
			newPassword: (this.refs.newPassword)? this.refs.newPassword.getValue() : "",
			repPassword: (this.refs.repPassword)? this.refs.repPassword.getValue() : "",
			name: (this.refs.name)? this.refs.name.getValue() : "",
			phoneNumber: (this.refs.phoneNumber)? this.refs.phoneNumber.getValue() : "",
			prFacility: (this.refs.prFacility)? this.refs.prFacility.getValue() : "",
			prSpecialty: (this.refs.prSpecialty)? this.refs.prSpecialty.getValue() : "",
			verificationKey: (this.refs.verificationKey)? this.refs.verificationKey.getValue() : ""
		}
	}

	handleSubmit(event) {
	 	event.preventDefault()
		var username = this.refs.loginUsername.value.toLowerCase()
		var pass = this.refs.pass.value
		req.authenticate(username, pass)
			.then((res) => {
				sessionStorage.token = res;
				if(req.whoami().role === "Doctor"){
					browserHistory.push('/Schedule');
				} else {
					browserHistory.push('/Dashboard');
				}
				this.props.upp(true);
			}).catch((res) => {
				var newState = this.currentStateObject();
    			newState.error = true;
				this.setState(newState);
				this.refs.pass.value = '';
				console.log("Invalid username or password")
			});
    }

    radioClick(event){
    	var newState = this.currentStateObject();
    	newState.role = event.target.id;
    	this.setState(newState);
    }

    genderSel(event){
    	var newState = this.currentStateObject();
    	newState.gender = event.target.id;
    	this.setState(newState);
    }

    nextClick(event){
    	event.preventDefault();
    	var newState = this.currentStateObject();
    	var haserror = this.refs.newUsername.checkValidation() || this.refs.newPassword.checkValidation();
    	if(this.refs.newPassword.getValue() !== this.refs.repPassword.getValue()) {
    		newState.pMatch = true;
    		this.setState(newState);
    	} else if (!haserror) {
    		newState.next = event.target.id;
    		this.setState(newState);
    	}
    }

    backClick(event){
    	var newState = this.currentStateObject();
    	newState.next = event.target.id;
    	this.setState(newState)
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
					browserHistory.push('/Dashboard');
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
					<label><input ref="loginUsername" placeholder="email" /></label>
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
					    <input type="radio" id="Doctor" tabIndex="-1" onClick={this.radioClick.bind(this)} /> Doctor
					  </label>
					  <label style={{opacity:(this.state.role ==="Doctor")?"0.5":"1"}} className="btn btn-primary">
					    <input type="radio" id="Patient" tabIndex="-1" onClick={this.radioClick.bind(this)} />Patient
					  </label>
					</div>
	    			<Comp.ValidatedInput ref="newUsername"
	  					validation="required" label="User Name" name="username" type="text" tabDisable={this.state.next}
	  					value={this.state.newUsername} errorHelp={{
	    					required:"Username Required"
	    				}} />
					<Comp.ValidatedInput ref="newPassword"
	  					validation="required" label="Password" name="password" type="password" tabDisable={this.state.next}
	  					value={this.state.newPassword} errorHelp={{
	    					required:"Password Required"
	    				}} />
	    			<Comp.ValidatedInput ref="repPassword"
	  					validation="required" label="Password" name="password" type="password" tabDisable={this.state.next}
	  					value={this.state.repPassword} />
	    			<button tabIndex="-1" className="btn btn-primary" id="true" onClick={this.nextClick.bind(this)}>Next</button>
	    			{this.state.pMatch &&(<p style={{color:"#a94442"}}>Passwords do not match</p>)}
	    			{this.state.createUserError &&(<p style={{color:"#a94442"}}>Username not available</p>)}
	    		</div>
	    		<div style={{left:(!this.state.next)?"100%": "0"}} className="inputPanel detailsInput">
	    			{ this.state.role ==="Doctor"  && (
					<div>
	    				<Comp.ValidatedInput ref="name"
		  					validation="required" label="Name" name="name" type="text" tabDisable={!this.state.next}
		  					value={this.state.name} errorHelp={{
		    					required:"Name Required"
		    				}} />
	    				<div className="btn-group" data-toggle="buttons">
		        		 	<label style={{opacity:(gender === "male" || gender === "m" )?"1":"0.5"}} className="btn btn-primary">
						    	<input type="radio" id="male" tabIndex="-1" onClick={this.genderSel.bind(this)} />Male
						  	</label>
						  	<label style={{opacity:(gender === "female" || gender === "f")?"1":"0.5"}} className="btn btn-primary">
						    	<input type="radio" id="female" tabIndex="-1" onClick={this.genderSel.bind(this)} />Female
						  	</label>
						</div>
		    			<Comp.ValidatedInput ref="phoneNumber"
		  					validation="required" label="Phone Number" name="phoneNumber" type="text" tabDisable={!this.state.next}
		  					value={this.state.phoneNumber} errorHelp={{
		    					required:"Required"
		    				}} />
		    			<Comp.ValidatedInput ref="prFacility"
		  					validation="required" label="Primary Facility" name="prFacility" type="text" tabDisable={!this.state.next}
		  					value={this.state.prFacility} errorHelp={{
		    					required:"Required"
		    				}} />
		    			<Comp.ValidatedInput ref="prSpecialty"
		  					validation="required" label="Primary Specialty" name="prSpecialty" type="text" tabDisable={!this.state.next}
		  					value={this.state.prSpecialty} />
		    			<Comp.ValidatedInput ref="verificationKey"
		  					validation="required" label="Access Key" name="accessKey" type="text" tabDisable={!this.state.next}
		  					value={this.state.verificationKey} />
		  				{this.state.licenseError &&(<p style={{color:"#a94442"}}>Unable to create user</p>)}
						</div>
	    			)}
					{ this.state.role !== "Doctor"  && (
					<div>
		    			<Comp.ValidatedInput ref="verificationKey"
		  					validation="required" label="Medical Number" name="medicalNumber" type="text" tabDisable={!this.state.next}
		  					value={this.state.verificationKey} errorHelp={{
		    					required:"Medical Number Required"
		    				}} />
		    			{this.state.patientError &&(<p style={{color:"#a94442"}}>Unable to create user</p>)}
		    		</div>
					)}
					<button tabIndex="-1" style={{float:"left"}} className="btn btn-default" onClick={this.backClick.bind(this)}>Back</button>
	    			<button tabIndex="-1" style={{float:"right"}} onClick={this.createSubmit.bind(this)} className="btn btn-primary">Submit</button>
	    		</div>
	        </div>
        </div>
      );
	}
}

// Static page to verify logout action. Clears sessionstorage.
class Logout extends Component {
	componentDidMount() {
		sessionStorage.clear();
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
