import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment'
import requests from './requests';
import './css/Schedule.scss';

// The custom row that shows appoinment related info, for the list of appointments table
class AppointmentRow extends Component{
  render(){
    // when the appointment is compelted (dateScheduled == 0)
    var date;
    if (this.props.dateScheduled === 0){
      date = this.props.dateVisited;
    }else{
      date = this.props.dateScheduled;
    }
    var appDate = moment.unix(date).format("MM/DD/YYYY");
		var startTime = moment.unix(date).format("LT");
		var endTime = moment.unix(date).add("minutes", 30).format("LT");
		// var actionURL = this.props.action === 'Record' ?
		// 	"/appointment/create":"/Appointments?appointmentUUID="+this.props.appointmentUUID;

    return (
			<tr>
        <td>
          <Link to={"Appointments?appt="+this.props.appointmentUUID+"&id="+this.props.patientUUID}>
          <span className="glyphicon glyphicon-search"></span>{appDate}</Link>
        </td>
				<td>{startTime} - {endTime}</td>
        <td>
          <Link to={"Dashboard?id="+this.props.patientUUID} >{this.props.patientName}</Link>
        </td>
        <td>{this.props.notes}</td>
				{/* <td><Link to={actionURL} >{this.props.action}</Link></td> */}
			</tr>
		);
	}
}

// The csutom Table, that is built to display list of all appointments of a doctor
var ScheduleTable = React.createClass({
  render:function(){
  	var rows =[];
    var filteredRows = this.props.appts.filter(
      (item) => {
        var date;
        //ensure that date isn't zero (which depends if appointment is future or not)
        if(item.dateScheduled === 0){
          date = item.dateVisited;
        }else{
          date = item.dateScheduled;
        }
        //only return this item if its date is between the startDate and endDate
        return((moment.unix(date).isSameOrAfter(this.props.startDate))
              && (moment.unix(date).isSameOrBefore(this.props.endDate)));
       }
    );

  	filteredRows.forEach(function(appt, index){
		    rows.push( <AppointmentRow
          appointmentUUID={appt.appointmentUUID}
          patientUUID={appt.patientUUID}
          doctorUUID={appt.doctorUUID}
          patientName={appt.patientName}
          dateScheduled={appt.dateScheduled}
          dateVisited={appt.dateVisited}
          key={appt.appointmentUUID}
          notes={appt.notes}
          action={this.props.action} /> );
    }.bind(this));

    return (
      <div>
        <table className="table-striped table-hover">
          <thead>
            <tr>
              <th>Date (M/D/Y)</th>
              <th>Time</th>
              <th>Patient</th>
              <th>Notes</th>
            </tr>
          </thead>
      		<tbody>
      			{rows}
      		</tbody>
    		</table>
      </div>
    );
  }
});

class Schedule extends Component{
  constructor(props){
    super(props);
    this.state = {
      appointmentsList: [],
      startDate: '1000-01-01',
      endDate: '5555-12-31'
    }
  }

  // call back function that changes the state of 'startDate' state variable
  // used to keep track of user input of start date for filtering
  updateStartRange(event){
    if(moment(event.target.value).isValid()){
      this.setState({startDate: moment(event.target.value).format("MMM/DD/YYYY")});
    }
  }

  // call back function that changes the state of 'endDate' state variable
  // used to keep track of user input of end date for filtering
  updateEndRange(event){
    if(moment(event.target.value).isValid()){
      this.setState({endDate: moment(event.target.value).format("MMM/DD/YYYY")});
    }
  }

  componentDidMount(){
  	requests.appointmentsByDocSearch("dummy")
  		.then((result) => {
  			console.log("Appointments List from server : " + result);
  			this.setState({ appointmentsList:result });
  			console.log(this.state)
  		})
  		.catch(function(e){
  			console.log("Could not mount request for appointments List from Doc")
  		});
	}

  render(){
    // var currentDate = moment();
    return (
      <div className="schedule">
        <div className="pageHeader">
            <h1 className="mainHeader">Doctor's Appointments</h1>
        </div>

        <div className="moduleBody">
            <form>
                <div className="dateSelector">
                  <p> From: </p>
                  <input type="date" name="start" id="startDateText"
                    onChange={this.updateStartRange.bind(this)}
                    min="1000-01-01"/>
                </div>

                <div className="dateSelector">
                  <p> To: </p>
                  <input type="date" name="end" id="endDateText"
                    onChange={this.updateEndRange.bind(this)}
                    max="5555-12-31"/>
                </div>
            </form>
            {this.state.appointmentsList.length > 0 &&
                <ScheduleTable appts={this.state.appointmentsList}
                  action="Record"
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}/>
            }
        </div>
      </div>
    );
  }
}

export default Schedule;
