import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './App';
import Cont from './Cont';

import './css/index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Cont} >
      <Route path="users" component={App}>
        
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);


