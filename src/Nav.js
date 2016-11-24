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
            <IndexLink to="/Dashboard" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Dashboard</IndexLink>
          </li>
          <li>
            <Link to="/Documents" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Documents</Link>
          </li>
          <li>
            <Link to="/Appointments" activeClassName="active" activeStyle={{fontWeight: 'bold'}} >Appointments</Link>
          </li>
          <li>
            <Link to="/RealtimeDisplay" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Real-Time Display</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
