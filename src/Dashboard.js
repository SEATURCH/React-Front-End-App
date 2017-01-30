import React, { Component } from 'react';
import requests from './requests';
import PatientGeneral from './PatientGeneral';
import PatientAllergy from './PatientAllergy';
import PatientPrescription from './PatientPrescription';
import PatientAppointments from './PatientAppointments';
//import Nav from './Nav';
//import WelcomeBanner from './WelcomeBanner';

import './css/Dashboard.scss';

class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
			generalInfoList: {
				"patientUUID": "",
				"age": 0,
				"gender": "",
				"insuranceNumber": "",
				"name": ""
				// userId: "1u4c5",
				// medicalNumber: "12345678",
				// firstName: "Steven",
				// lastName: "Strange",
				// gender: "Male",
				// birthDate: "Feb-29-1700",
				// contactInfo: "111-222-3333",
				// address: "111 Mall Street, Vancouver, BC, Canada",
				// primaryDoctor: "Dr. Popular"
			},
			prescriptionList:[{
					doctorName:"Doctor 1",
					startDate:1485726115,
					endDate:1485846115,
					name:"Drug Name 1",
					notes:"Notes 1"
				},{
					doctorName:"Doctor",
					startDate:1485526115,
					endDate:1485723115,
					name:"Drug Name",
					notes:"Notes"
				},{
					doctorName:"Doctor 1",
					startDate:1485726115,
					endDate:1485846115,
					name:"Drug Name 1",
					notes:"Notes 1"
				},{
					doctorName:"Doctor",
					startDate:1485526115,
					endDate:1485723115,
					name:"Drug Name",
					notes:"Notes"
				},{
					doctorName:"Doctor 1",
					startDate:1485726115,
					endDate:1485846115,
					name:"Drug Name 1",
					notes:"Notes 1"
				},{
					doctorName:"Doctor",
					startDate:1485526115,
					endDate:1485723115,
					name:"Drug Name",
					notes:"Notes"
				}
				],
			appointmentList: [{
				date:1485726115
			},{
				date:1485846115
			},{
				date:1485723115
			}],
			problemsList: {}
		}
	}

	componentDidMount(){
		// if(!this.props.location.query.id)
		// 	return;
			console.log(this.props.location)
			requests.patientSearch("dummy")
				.then((result) => {
					console.log("JSON from server : " + result);
					this.setState({ generalInfoList:result });
					console.log(this.state)
				})
				.catch(function(e){
					console.log("Could not mount")
				});
	}

	render() {
		return (
			<div>
				<PatientAppointments appointmentList={this.state.appointmentList} />
				<PatientPrescription prescriptionList={this.state.prescriptionList} />
				<PatientAllergy allergyInfo={this.state.generalInfoList.notes} patientuuid={this.state.generalInfoList.patientuuid} />
				<PatientGeneral generalInfo={this.state.generalInfoList} />
				{/* 
				<PatientMedication medicationInfo = {this.state.medicationList} />
				<PatientProblems problemsInfo = {this.state.problemsList} /> */}
			</div>
		)
	}
}

export default Dashboard;
