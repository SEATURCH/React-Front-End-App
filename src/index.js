import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Link, browserHistory } from 'react-router';

import App from './AppCont';
import Auth from './Auth/Auth.js';
import './css/index.scss';



class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Oops!</h1>
        <h3>We can't seem to find the page you're looking for</h3>
        <div>
        	Error Code: 404
        	Here are some helpful links:
        	<p><Link to="Dashboard" >Dashboard</Link></p>
        </div>
      </div>
    );
  }
} 

class Conts extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn:sessionStorage.token
    }
  }
  
  updateAuth(loggedIn) {
    console.log("REZ")
    console.log(this);
    this.setState({
      loggedIn
    })
  }

  render() {
    return (
      <div>
        <div className="Header">
          <h2>LETS Care</h2>
          <div className="colLeft">
            <Link to="Dashboard" >Dashboard</Link>
          </div>
          <div className="colRight">
            { this.state.loggedIn? <Link to="logout" >Logout</Link> :null}
            {!this.state.loggedIn? <Link to="login" >Login</Link> :null}
          </div>
        </div>
        <div className="Body">
          {React.cloneElement(this.props.children, {upp: this.updateAuth.bind(this)})}
        </div>
        <div className="Footer">
        </div>
      </div>
    );
  }
} 


ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={Conts} >
    	<Redirect from="/" to="Dashboard" />
		  <Route path="login" component={Auth.Login} />
      <Route path="logout" component={Auth.Logout} />
  		<Route onEnter={Auth.requireAuth}>
        <Route path="Dashboard" component={App} />
        <Route path="*" component={NotFound} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);


