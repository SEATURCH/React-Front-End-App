import React, { Component } from 'react';
import './css/AppCont.scss';
import { IndexLink, Link } from 'react-router';


class AppCont extends Component {

	render() {
		return (
			<div id="AppContainer">
				<div id="navMenu">
					<ul id="menuList">
						<li className="menu-text"></li>
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
						<li>
							<Link to="/Home_Doc" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home_Doc</Link>
						</li>
					</ul>
				</div>
				<div id="content-body">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default AppCont;
