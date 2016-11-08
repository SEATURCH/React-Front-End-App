import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './AppCont';
import './css/index.css';

class Conts extends Component {
  render() {
    return (
      <div>
        <div className="Header">
          <h2>Welcome to LETS Care</h2>
        </div>
        <div className="Body">
          {this.props.children}
        </div>
        <div className="Footer">
        </div>
      </div>
    );
  }
} 

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Conts} >
      <Route path="users" component={App}>
        
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);


