import React, { Component } from 'react';
import requests from './requests';
import Comp from './Auth/CustomComp.js'
import PatientPrescription from './PatientPrescription';
import moment from 'moment';
import './css/DetailedAppt.scss';

class TextRow extends React.Component{
	render(){
		var date = moment.unix(this.props.date).format("MMM/DD/YYYY");
		return (
			<tr>
				<td>
					<div><b>{date}</b></div>
					<div className="subheader">
						{this.props.value}
					</div>
				</td>
			</tr>
		);
	}
}

var TextTable = React.createClass({
  render:function(){
  	var rows =[];
  	this.props.list.forEach(function(item, index){
		rows.push( 
			<TextRow date={item.date} key={index} value={item.value} /> );
	});
    return (
      <div>
        <table className="table-striped">
			<tbody>
				{rows}
			</tbody>
		</table>
      </div>
    );
  }
});


class Appointments extends Component {
	constructor(props){
		super(props);
		this.state = {
			showBtn:false,
			generalInfoList: {},
			prescriptionList:[],
			appointmentDetail: {
				notes:{}
			}
		}
	}

	componentDidMount(){
		requests.getPatientAppointment(
			this.props.location.query.appt, this.props.location.query.id)
			.then((result) => {
				result.appointmentDetail.notes = JSON.stringify({
					chiefComplaints:[
						{date: 1488246759,
							value: "OKOKOK"},
						{date: 1488246759,
							value: "DOKOKOK"}
					],
					doctorNotes:[
						{date: 1488246759,
							value: "DKDKDKD"},
						{date: 1488246759,
							value: "MKMKMKMK"}
					]
				})
				result.appointmentDetail.notes = JSON.parse(result.appointmentDetail.notes)
				this.setState(result);
			})
			.catch(function(e){
				console.log("Could not mount")
			});
	}
	submiteUpdate(event) {
	 	event.preventDefault()
	 	// req.updatePatient(patient)
			// .then((res) => {
			// 	this.setState({ 
			// 		showBtn:false,
			// 		patientInfo: patient
			// 	});					
			// })
			// .catch(function(e){
			// 	this.setState({ 
			// 		showBtn:false,
			// 		patientInfo: patient
			// 	});
			// });
    }

	buttonTrigger(event) {
	 	event.preventDefault()
	 	this.refs.save.showButtons(event);
    }

   	cancelChanges(event) {
	 	this.setState({ 
			patientInfo: this.state.patientInfo
		});
    }

  render() {
  	var today = moment().format("MMM/DD/YYYY");
  	return (
      <div className="DetailedAppointments">
      	<div className="pageHeader" style={{position: "relative"}}>
      		<div className="inlineBlock">
		      	<h1 className="mainHeader">Appointment {this.state.appointmentDetail.dateVisited}</h1>
		      	<h2 className="subHeader">{this.state.generalInfoList.name}</h2>
	      	</div>
	      	<Comp.SaveButtons ref="save" init={false} saveButton={this.submiteUpdate.bind(this)} cancelButton={this.cancelChanges.bind(this)} /> 
	    </div>

		<div className="moduleBody">
	      	<div className="container-fluid">
	      		<div className="row">
	      			<div className="col col-md-4">
	      				<h3>Chief Complaint</h3>
	      				<TextTable list={this.state.appointmentDetail.notes.chiefComplaints || []} />
	      				<div style={{marginTop:"10px"}}><b>Add: {today}</b></div>
	      				<Comp.TextInput ref="allergies" onFocus={this.buttonTrigger.bind(this)}
			        		value="" reset={!this.state.showBtn} />
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
	      				<TextTable list={this.state.appointmentDetail.notes.doctorNotes || []} />
	      				<div style={{marginTop:"10px"}}><b>Add: {today}</b></div>
	      				<Comp.TextInput ref="allergies" onFocus={this.buttonTrigger.bind(this)}
			        		value="" reset={!this.state.showBtn} />
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
