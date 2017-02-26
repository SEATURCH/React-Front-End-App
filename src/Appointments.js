import React, { Component } from 'react';
import requests from './requests';
import PatientAllergy from './PatientAllergy';
import PatientPrescription from './PatientPrescription';
import PatientAppointments from './PatientAppointments';

import './css/DetailedAppt.scss';

class Appointments extends Component {
	constructor(props){
		super(props);
		this.state = {
			generalInfoList: {
				"patientUUID": "",
				"address": "",
				"bloodType": "",
				"dateOfBirth": 0,
				"emergencyContact": "",
				"gender": "",
				"medicalNumber": "",
				"name": "",
				"notes": "",
				"phoneNumber": ""
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
				}],
			appointmentDetail: {}
		}
	}

	componentDidMount(){
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
      <div className="DetailedAppointments">
      	<div className="pageHeader">
	      	<h1 className="mainHeader">Appointment</h1>
	      	<h2 className="subHeader">{"PatientName"}</h2>
	    </div>

		<div className="moduleBody">
	      	<div className="container-fluid">
	      		<div className="row">
	      			<div className="col col-md-4">
	      				<h3>Chief Complaint</h3>
	      				<textarea></textarea>
	      			</div>
	      			<div className="col col-md-8">
	  					<h3>Vitals</h3>
	      				<textarea></textarea>
	      			</div>
	      		</div>
	      		<div className="row">
	      			<div className="col col-md-12">
	      				<h3>Patient Info</h3>
	      			</div>
	      			<div className="col col-md-6">
	      				<PatientPrescription prescriptionList={this.state.prescriptionList} />
	      			</div>
	      			<div className="col col-md-6">
	      				<h3 className="modeleHeader">Patient Allergies</h3>
						<textarea className="allergiesText" value={this.state.generalInfoList.notes} disabled></textarea>
	      				{//<PatientAllergy allergyInfo={this.state.generalInfoList.notes} patientuuid={this.state.generalInfoList.patientuuid} />
	      				}
	      			</div>
	      		</div>
	      		<div className="row nextActions">
	      			<div className="col col-md-6">
	      				<h3>Doctor Notes</h3>
	      				<textarea></textarea>
	  				</div>
	  				<div className="col col-md-6">
	      				<h3>Add Prescription</h3>
	      				<textarea></textarea>
	      			</div>
	      		</div>
	      	</div>
      	</div>
	</div>
    );
  }
}

export default Appointments;
