import React, {Component } from 'react';
import req from '../requests.js'

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
				this.props.router.replace('Dashboard');
				this.props.upp(true);
				
			})
			.catch(function(e){
				console.log("Could not mount")
			});
    }

	render(){
		return (
		<div id="Login">
			<div className="signIn">
				<h2>Sign In</h2>
		        <form onSubmit={this.handleSubmit.bind(this)}>
					<label><input ref="email" placeholder="email" /></label>
					<label><input ref="pass" placeholder="password" /></label>
					<br />
					<button type="submit">login</button>
						{this.state.error && (
						<p>Bad login information</p>
					)}
		        </form>
	        </div>
	        <div className="createUser">
	        	<h2>Create Account</h2>
	        	<form onSubmit={this.handleSubmit.bind(this)}>
		          	<label><input ref="firstName" placeholder="First Name" /></label>
		          	<label><input ref="lastName" placeholder="Last Name" /></label>
					<label><input ref="careCardNumber" placeholder="12345678910" /></label>
		          	<label><input ref="pass" placeholder="password" /></label>
		          	<br />
		          	<button type="submit">login</button>
		          	{this.state.error && (
		            	<p>Bad login information</p>
		          	)}
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