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

	componentDidMount(){
		requests.getPatientDashboard(this.props.location.query.id)
			.then((result) => {
				this.setState(result);
				pubSub.publish("PATI SEL", this.state.generalInfoList.name)
			})
			.catch(function(e){
				console.log("Could not mount");
			});
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
			      				<PatientAppointments appointmentList={this.state.appointmentList} />
			      			</div>
			      			<div className="col col-md-6">
			  					<PatientPrescription prescriptionList={this.state.prescriptionList} />
			      			</div>
		      			</div>
		      			<div className="row">
			      			<div className="col col-md-12">
			  					<PatientProfile generalInfo={this.state.generalInfoList} patientuuid={this.state.generalInfoList.patientUUID} />
			      			</div>
			      		</div>
			      	</div>
		      	</div>
				{/*
				<PatientGeneral generalInfo={this.state.generalInfoList} />
				<PatientMedication medicationInfo = {this.state.medicationList} />
				<PatientProblems problemsInfo = {this.state.problemsList} /> */}
			</div>
		)
	}
}

export default Dashboard;
