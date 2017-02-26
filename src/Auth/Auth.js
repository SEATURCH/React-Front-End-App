import React, {Component } from 'react';
import req from '../requests.js'
import Comp from './CustomComp.js'
import { browserHistory } from 'react-router'
//import sessionAuth from './sessionAuth.js'

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
	        error: false
	    }
	}

	handleSubmit(event) {
	 	event.preventDefault()
		const email = this.refs.email.value
		const pass = this.refs.pass.value
		req.authenticate(email, pass)
			.then((res) => {
				sessionStorage.token = res;
				browserHistory.push('/Schedule');
				this.props.upp(true);
			}).catch((res) => {
				this.setState({error:true});
				this.refs.pass.value = '';
				console.log("Could not mount")
			});
    }

	render(){
		return (
		<div id="Login">
			<div className="signIn">
				<h2>Sign In</h2>
		        <form className="form-vertical" onSubmit={this.handleSubmit.bind(this)}>
					<label><input ref="email" placeholder="email" /></label>
					<label><input ref="pass" placeholder="password" /></label>
					<br />
					<button type="submit" className="btn btn-primary">Login</button>
					{this.state.error && (
						<p>Incorrect username or password</p>
					)}
		        </form>
	        </div>
	        <div className="createUser">
	        	<h2>Create Account</h2>
	        	<form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
	    			<Comp.ValidatedInput validation="required" label="Name" name="name" type="text" 
	    				errorHelp={{
	    					required:"Name required"
	    				}} />
	    			<Comp.ValidatedInput validation="required" label="User Name" name="username" type="text" 
	    				errorHelp={{
	    					required:"Username required"
	    				}} />
	    			<Comp.ValidatedInput validation="required" label="Password" name="password" type="text" 
	    				errorHelp={{
	    					required:"Password required"
	    				}} />
	    			<button type="submit" className="btn btn-primary">Submit</button>
	    		</form>
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
