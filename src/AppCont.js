import React, { Component } from 'react';
import './css/AppCont.scss';
import { IndexLink, Link } from 'react-router';
import requests from './requests';
import pubSub from 'pubsub-js'
import classnames from 'classnames';

class AppCont extends Component {
	constructor(props){
			super(props);
			requests.whoami();
			this.state = { 
				patientBroadCast: pubSub.subscribe("PATI SEL", function(msg, data) {
				 	this.setState({ selectedPatient: data });
				}.bind(this)),
				selectedPatient:""
			};

		}

	componentWillUnmount() {
		pubSub.unsubscribe(this.state.patientBroadCast);
	}
	render() {
		var listShow = classnames({"show":this.state.selectedPatient });
		
		return (
			<div id="AppContainer">
				<div id="navMenu">
					<ul id="menuList">
						{ requests.whoami().role === "Doctor" && (
							<ul id="menuList">
								<li>
									<IndexLink to="/Schedule" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Schedule</IndexLink>
								</li>
								<li>
									<Link to="/Notifications" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Notifications</Link>
								</li>
								<li>
									<Link to="/Home_Doc" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home_Doc</Link>
								</li>
								<li className="nestedHeaders">
									<li className="main">
										Patient:
									</li>
									<li className={"sub right-align " + listShow}>
										<li>
											<Link to={"/Dashboard?id="+sessionStorage.currentPatient} activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Dashboard</Link>
										</li>
										<li>
											<Link to={"/Documents?id="+sessionStorage.currentPatient} activeClassName="active" activeStyle={{fontWeight: 'bold'}} >Documents</Link>
										</li>
									</li>
								</li>
							</ul>
						)}
						{ requests.whoami().role === "Patient" && (
							<ul id="menuList">
								<li>
									<Link to="/Dashboard" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Dashboard</Link>
								</li>
								<li>
									<Link to="/Appointments" activeClassName="active" activeStyle={{fontWeight: 'bold'}} >Appointments</Link>
								</li>
								<li>
									<Link to="/Documents" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Documents</Link>
								</li>
							</ul>
						)}
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
