import React, { Component } from 'react';
import { Link, IndexLink} from 'react-router';
import './css/Nav.scss';

class Nav extends Component{
  render(){
    return (
      <div id="navMenu">
        <ul id="menuList">
          <li className="menu-text">Menu</li>
          <li>
            <IndexLink to="/" activeClassName="active">Dashboard</IndexLink>
          </li>
          <li>
            <Link to="/" activeClassName="active">Documents</Link>
          </li>
          <li>
            <Link to="/" activeClassName="active">Appointments</Link>
          </li>
          <li>
            <Link to="/" activeClassName="active">Real-Time Display</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
