import React, { Component } from 'react';
import requests from './requests';
import PatientProfile from './PatientGeneral';
import PatientPrescription from './PatientPrescription';
import PatientAppointments from './PatientAppointments';
import pubSub from 'pubsub-js'

//import Nav from './Nav';
//import WelcomeBanner from './WelcomeBanner';

import './css/Dashboard.scss';

class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
			patientBroadCast: pubSub.subscribe("PATI SEL", function(msg, data) {
			 	this.setState({ generalInfoList: {name: data}});
			}.bind(this)),
			generalInfoList: {
				patientUUID: "",
				address: "",
				bloodType: "",
				dateOfBirth: 0,
				emergencyContact: "",
				gender: "",
				medicalNumber: "",
				name: "",
				notes: "",
				phoneNumber: ""
			},
			prescriptionList:[{
					doctorName:"",
					startDate:0,
					endDate:0,
					name:"",
					notes:""
				}],
			appointmentList: [],
			problemsList: {}
		}
	}

	componentDidMount() {
		var searchId = (requests.whoami().role==="Doctor")? this.props.location.query.id: requests.whoami().uuid;
		requests.getPatientDashboard(searchId)
			.then((result) => {
				this.setState(result);
				pubSub.publish("PATI SEL", this.state.generalInfoList.name)
			})
			.catch(function(e){
				console.log("Could not mount");
			});
	}
	
	componentWillUnmount() {
		pubSub.unsubscribe(this.state.patientBroadCast);
	}

	render() {
		return (
			<div className="Dashboard">
				<div className="pageHeader">
			      	<h1 className="mainHeader">Patient Profile</h1>
				    <h2 className="subHeader">{this.state.generalInfoList.name}</h2>
			    </div>

			    <div className="moduleBody">
					<div className="container-fluid">
			      		<div className="row">
			      			<div className="col col-md-6">
			      				<PatientAppointments role={requests.whoami().role} appointmentList={this.state.appointmentList} />
			      			</div>
			      			<div className="col col-md-6">
			  					<PatientPrescription role={requests.whoami().role} prescriptionList={this.state.prescriptionList} />
			      			</div>
		      			</div>
		      			<div className="row">
			      			<div className="col col-md-12">
			  					<PatientProfile role={requests.whoami().role} generalInfo={this.state.generalInfoList} patientuuid={this.state.generalInfoList.patientUUID} />
			      			</div>
			      		</div>
			      	</div>
		      	</div>
			</div>
		)
	}
}

export default Dashboard;
