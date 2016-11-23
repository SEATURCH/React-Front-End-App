import React, { Component } from 'react';
import requests from './requests';
import PatientGeneral from './PatientGeneral';
import Nav from './Nav';
import WelcomeBanner from './WelcomeBanner';

class AppCont extends Component {
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
			allergyList : {},
			medicationList: {},
			vitalList: {},
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
				<WelcomeBanner firstName={this.state.generalInfoList.firstName}/>
				<Nav />
				<PatientGeneral generalInfo={this.state.generalInfoList} />
				{/* <PatientAllergy allergyInfo = {this.state.allergyList} />
				<PatientMedication medicationInfo = {this.state.medicationList} />
				<PatientProblems problemsInfo = {this.state.problemsList} /> */}
			</div>
		)
	}
}

export default AppCont;
