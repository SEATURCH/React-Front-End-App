import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Link, browserHistory } from 'react-router';

import App from './AppCont';
import Dashboard from './Dashboard';
import Documents from './Documents';
import Appointments from './Appointments';
import Auth from './Auth/Auth.js';
import Home_Doc from './Home_Doc';
import Schedule from './Schedule';
import Notifications from './Notifications'

import './css/index.scss';
import './css/bootstrap.min.css'


// Page not found warning
class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Oops!</h1>
        <h3>We can't seem to find the page you're looking for</h3>
        <div>
        	Error Code: 404
        	Here are some helpful links:
        	<p><Link to="/" >Dashboard</Link></p>
        </div>
      </div>
    );
  }
}

// Main overhead component used in the React-Router logic.
// Includes the header, footer, and it's children components 
// is selectively shown by React-Router according to URL
class Conts extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn:sessionStorage.token
    }
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  }

  render() {
    return (
      <div>
        <div className="Header">
          <h2>EMR</h2>
          <div className="colRight">
            { this.state.loggedIn? <Link to="logout" >Logout</Link> :null}
            {!this.state.loggedIn? <Link to="login" >Login</Link> :null}
          </div>
        </div>
        <div className="Body">
          {React.cloneElement(this.props.children, {upp: this.updateAuth.bind(this)})}
        </div>
      </div>
    );
  }
}


// Only accessible page outside of requiring authorization
// (onEnter={Auth.requireAuth}) is login, logout
ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={Conts} >
      <Redirect from="/" to="Schedule"/>
      <Route path="login" component={Auth.Login} />
      <Route path="logout" component={Auth.Logout} />
  		<Route onEnter={Auth.requireAuth}>
        <Route path="/" component={App}>
          <Route path="Dashboard" component={Dashboard} />
          <Route path="Documents" component={Documents.DocuList} />
          <Route path="Document" component={Documents.Docu} />
          <Route path="Appointments" component={Appointments} />
          <Route path="Home_Doc" component={Home_Doc} />
          <Route path="Schedule" component={Schedule} />
          <Route path="Notifications" component={Notifications} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
