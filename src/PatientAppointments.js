import React, { Component } from 'react';
import moment from 'moment'
import { Link } from 'react-router';
import classnames from 'classnames'


class AppRow extends React.Component{
	render(){
		var currentTime = moment().unix();
		var fadeOut = classnames({"past":currentTime > this.props.date });
		
		var appDate = moment.unix(this.props.date).format("MMM/DD/YYYY");
		var startTime = moment.unix(this.props.date).format("LT");
		var endTime = moment.unix(this.props.date).add("minutes", 30).format("LT");
		return (
			<tr className={fadeOut}>
				<td>{appDate}</td>
				<td>{startTime} - {endTime}</td>
				<td>
					<Link to={"Appointments?appt="+this.props.appointmentUUID+"&id="+this.props.patientUUID}>
						View
					</Link>
				</td>
			</tr>
		);
	}
}

var AppTable = React.createClass({
  render:function(){
  	var rows =[];
  	this.props.appts.forEach(function(appt, index){
		rows.push( 
			<AppRow date={appt.dateScheduled} key={index}
			patientUUID={appt.patientUUID} appointmentUUID={appt.appointmentUUID} /> );
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
		var apptList = this.props.appointmentList;
		apptList.sort(function(a, b){
			return b.date - a.date; 
		})
		return (
			<div className="PatientAppointments module">
				<h3 className="modeleHeader">Appointments</h3>
				<AppTable appts={apptList} />
			</div>
		)
	}
}

export default PatientAppointments;
