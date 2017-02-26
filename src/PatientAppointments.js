import React, { Component } from 'react';
import moment from 'moment'
import { Link } from 'react-router';


class AppRow extends React.Component{
	render(){
		var appDate = moment.unix(this.props.date).format("MMM/DD/YYYY");
		var startTime = moment.unix(this.props.date).format("LT");
		var endTime = moment.unix(this.props.date).add("minutes", 30).format("LT");
		var actionURL = this.props.action === 'Record' ?
			"/appointment/create":"/Appointments?appointmentUUID="+this.props.appointmentUUID;
		return (
			<tr>
				<td>{appDate}</td>
				<td>{startTime} - {endTime}</td>
				<td><Link to={actionURL} >{this.props.action}</Link></td>
			</tr>
		);
	}
}

var AppTable = React.createClass({
  render:function(){
  	var rows =[];
  	this.props.appts.forEach(function(appt, index){
		rows.push( <AppRow date={appt.dateScheduled} key={index} action={this.props.action} /> );
	}.bind(this));
    return (
      <div>
        <table className="table-striped table-hover">
			<tbody>
				{rows}
			</tbody>
		</table>
      </div>
    );
  }
});

class PatientAppointments extends Component {
	render() {
		var current = [];
		var past = [];
		var currentTime = new Date().getTime()/1000;
		this.props.appointmentList.forEach(function(appt){
			if(appt.date < currentTime)
				past.push(appt);
			else
				current.push(appt);
		});
		return (
			<div className="PatientAppointments module">
				<h3 className="modeleHeader">Appointments</h3>
				<h4 className="moduleSubHeader">Upcoming</h4>
				<AppTable appts={current}  action="Record" />
				<h4 className="moduleSubHeader">Past</h4>
				<AppTable appts={past} action="View" />
			</div>
		)
	}
}

export default PatientAppointments;
