import React, { Component } from 'react';
import requests from './requests';
import Comp from './Auth/CustomComp.js'
import PatientPrescription from './PatientPrescription';
import moment from 'moment';
import { browserHistory } from 'react-router'
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
				appointmentUUID: this.props.location.query.appt,
				patientUUID: this.props.location.query.id,
				doctorUUID: requests.whoami().uuid,
				dateVisited: 0,
				breathingRate: 0,
				heartRate: 0,
				bloodOxygenLevel: 0,
				bloodPressure: 0,
				notes: {
					chiefComplaints:[],
					doctorNotes:[]
				}
			},
			chiefComp:"",
			doctorNotes:"",
			addedPrescript: []
		}
	}

	componentDidMount(){
		requests.getPatientAppointment(
			this.props.location.query.appt, this.props.location.query.id)
			.then((result) => {
				var newState = result;
				if(newState.appointmentDetail.hasOwnProperty("appointmentUUID")){
					try {
			         	newState.appointmentDetail.notes = JSON.parse(newState.appointmentDetail.notes);
			        } catch (e) {
						console.log(e)
						newState.appointmentDetail.notes = this.state.appointmentDetail.notes;
			        }
				}else{
					newState.appointmentDetail = this.state.appointmentDetail
				}
				this.setState(newState)
			})
			.catch(function(e){
				console.log("Could not get patient completedAppointment or patient prescription")
				console.log(e)
			});
	}

	submitUpdate(event) {
		event.preventDefault()
		var appointment = this.state.appointmentDetail;
		if(!this.state.appointmentDetail.dateVisited)
		appointment.dateVisited = moment().unix()
		if(this.refs.chiefComplaints.getValue()){
			appointment.notes.chiefComplaints.push({
				date: moment().unix(),
				value:this.refs.chiefComplaints.getValue()
			});
		}
		if(this.refs.doctorNotes.getValue()){
			appointment.notes.doctorNotes.push({
				date: moment().unix(),
				value:this.refs.doctorNotes.getValue()
			})
		}
		var prescriptions = [];
		this.state.addedPrescript.forEach((item, index) => {
			prescriptions.push({
				patientUUID: this.props.location.query.id,
				doctorUUID: requests.whoami().uuid,
				doctor:requests.whoami().name,
				drug: this.refs["drugName"+index].getValue(),
				startDate:item.endDate<moment().unix()? item.endDate: moment().unix(),
					endDate: moment(this.refs["endDate"+index].getValue()).unix(),
					instructions: this.refs["notes"+index].getValue()
				})
		})
		appointment.notes = JSON.stringify(appointment.notes)
		requests.updateAppointment(this.props.location.query.appt, appointment, prescriptions)
		.then((result) => {
			// this.setState(newState);
			location.reload()
		})
	}

	buttonTrigger(event) {
		event.preventDefault()
		this.refs.save.showButtons(event);
	}

	cancelChanges(event) {
		this.setState({
			appointmentDetail: this.state.appointmentDetail,
			addedPrescript: []
		});
  }

	clickAdd(event) {
		var temp = this.state.addedPrescript
		temp.push({
			name:"",
			endDate:Math.floor(new Date().getTime()/1000),
			notes:""
		})
		this.setState({
			chiefComp:this.refs.chiefComplaints.getValue(),
			doctorNotes:this.refs.doctorNotes.getValue(),
			addedPrescript:temp
		});
  }

	clickRm(event) {
		var temp = this.state.addedPrescript
		temp.splice(event.target.id, 1)
		this.setState({
			chiefComp:this.refs.chiefComplaints.getValue(),
			doctorNotes:this.refs.doctorNotes.getValue(),
			addedPrescript:temp
		});
  	}

	deleteAppointment(event){
		console.log(this.props.location.query)
		requests.deleteFutureAppointment(this.props.location.query.appt)
		.then((result) => {
			browserHistory.push('/Schedule');
			this.props.upp(true);	
		})
		.catch(function(e){
		});
	}

  render() {
		var today = moment().format("MMM/DD/YYYY");
		var dateVisited = (this.state.appointmentDetail.dateVisited)?
		moment.unix(this.state.appointmentDetail.dateVisited).format("MMM/DD/YYYY") : "New";
		var rows = [];
		this.state.addedPrescript.forEach((item, index) => {
			rows.push(
				<div className="newPrescript" key={index} >
					<span id={index} onClick={this.clickRm.bind(this)} className="glyphicon glyphicon-remove"></span>
					<Comp.ValidatedInput ref={"drugName" + index}
						validation="required" label="Add Drug" name="name" type="text"
						value={item.name} onFocus={this.buttonTrigger.bind(this)}
						errorHelp={{
							required:"Required"
						}} />
						<Comp.ValidatedInput ref={"endDate" + index} max="5555-12-31"
							validation="required" label="End Date" name="endDate" type="date"
							value={moment.unix(item.endDate).format("YYYY-MM-DD")} onFocus={this.buttonTrigger.bind(this)}
							errorHelp={{
								required:"Required"
							}} />
							Instructions
							<Comp.TextInput ref={"notes"+ index} onFocus={this.buttonTrigger.bind(this)}
								value={item.notes} />
							</div>
						);
	});
	return (
		<div className="DetailedAppointments">
			<div className="pageHeader" style={{position: "relative"}}>
				<div className="inlineBlock">
					<h1 className="mainHeader">Appointment {dateVisited}</h1>
					<h2 className="subHeader">{this.state.generalInfoList.name}</h2>
				</div>
				{!(this.state.appointmentDetail.dateVisited) &&
					<label style={{float:"right", margin:"10px 20px"}}>
				    	<button type="button" className="btn btn-danger btn-lg" onClick={this.deleteAppointment.bind(this)}>Delete Appointment</button>
			        </label>
				}
				<Comp.SaveButtons ref="save" init={false} saveButton={this.submitUpdate.bind(this)} cancelButton={this.cancelChanges.bind(this)} />
			</div>
			<div className="moduleBody">
				<div className="container-fluid">
					<div className="row">
						<div className="col col-md-4">
							<h3>Chief Complaint</h3>
							<TextTable list={this.state.appointmentDetail.notes.chiefComplaints || []} />
							<div style={{marginTop:"10px"}}><b>Add: {today}</b></div>
							<Comp.TextInput ref="chiefComplaints" onFocus={this.buttonTrigger.bind(this)}
								value={this.state.chiefComp} />
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
							</div>
						</div>
						<div className="row nextActions">
							<div className="col col-md-6">
								<h3>Doctor Notes</h3>
								<TextTable list={this.state.appointmentDetail.notes.doctorNotes || []} />
								<div style={{marginTop:"10px"}}><b>Add: {today}</b></div>
								<Comp.TextInput ref="doctorNotes" onFocus={this.buttonTrigger.bind(this)}
									value={this.state.doctorNotes} />
								</div>
								<div className="AddPrescriptions col col-md-6">
									<div>
										<h3>Add Prescription</h3>
										<button className="addNewBtn btn btn-default" onClick={this.clickAdd.bind(this)}>+</button>
									</div>
									<div>
										{rows}
										<table className="table-striped">
											<tbody>

											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
    );
  }
}

export default Appointments;
