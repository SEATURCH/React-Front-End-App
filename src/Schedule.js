import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment'
import requests from './requests';
import './css/Schedule.scss';
import classnames from 'classnames';

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
		var endTime = moment.unix(date).add("minutes", 60).format("LT");

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
        var date = item.dateVisited || item.dateScheduled;
        //only return this item if its date is between the startDate and endDate
        return((moment.unix(date).isSameOrAfter(this.props.startDate))
              && (moment.unix(date).startOf("day").isSameOrBefore(this.props.endDate)));
       }
    );

  	filteredRows.forEach(function(appt, index){
        var parsedNotes;
        try {
          parsedNotes = JSON.parse(appt.notes).chiefComplaints.map(function(elem){
            return elem.value
          }).join("\n")
        } catch (e) {
          parsedNotes = appt.notes
        }

		    rows.push( <AppointmentRow
          appointmentUUID={appt.appointmentUUID}
          patientUUID={appt.patientUUID}
          doctorUUID={appt.doctorUUID}
          patientName={appt.patientName}
          dateScheduled={appt.dateScheduled}
          dateVisited={appt.dateVisited}
          key={appt.appointmentUUID}
          notes={parsedNotes}
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
    }else{
      this.setState({startDate: '1000-01-01'});
    }
  }

  // call back function that changes the state of 'endDate' state variable
  // used to keep track of user input of end date for filtering
  updateEndRange(event){
    if(moment(event.target.value).isValid()){
      this.setState({endDate: moment(event.target.value).format("MMM/DD/YYYY")});
    }else{
      this.setState({endDate: '5555-12-31'});
    }
  }

  componentDidMount(){
  	requests.appointmentsByDocSearch("dummy")
  		.then((result) => {
        result.sort(function(a, b){
          var aDate = a.dateScheduled || a.dateVisited;
          var bDate = b.dateScheduled || b.dateVisited;
          return bDate - aDate;
        });
  			this.setState({ appointmentsList:result });
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
            <NewAppointmentForm/>
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

class NewAppointmentForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      showForm:false,
      patientsList:[]
    }
  }

  componentDidMount(){
    requests.patientsByDocSearch("dummy")
      .then((result) => {
        console.log("Sucessfully got patients List from server");
        this.setState({ patientsList:result });
      })
      .catch(function(e){
        console.log("Could not mount request for patients List from Doc")
      });
  }

  showForm(event) {
    event.preventDefault()
    this.setState({
      showForm:true
    });
  }

  hideForm(event) {
    event.preventDefault()
    this.setState({
      showForm:false
    });
  }

  findPatientIndex(query, list){
    var patient = {};
    //parse query string to extract name and DOB
    var name = query.substring(0, query.indexOf('(')).trim();
    var dob = query.substring((query.indexOf(':') + 2), (query.indexOf(')'))).trim();
    list.forEach(function(elem){
      if(elem.name == name &&
        moment.unix(elem.dateOfBirth).format("MM/DD/YYYY") === dob){
        patient = elem;
      }
    });
    return patient;
  }

  //Posts the notification to the appropriate doctor.
  createAppointment(event) {
    event.preventDefault()
    const note = this.refs.note.value;
    const selectedDate = this.refs.selectedDate.value;
    const selectedTime = this.refs.selectedTime.value;
    var patientDescription = this.refs.selectedPatient.value;
    var patient = this.findPatientIndex(patientDescription, this.state.patientsList);

    console.log(patient);

    var fullTime = selectedDate + " " + selectedTime;
    var finalTime = moment(fullTime, "YYYY-MM-DD hh:mm A").unix();
    console.log(moment.unix(finalTime).format("MM/DD/YYYY"));
    console.log(moment.unix(finalTime).format("LT"));

    var appt = {
      patientUuid: patient.patientUUID,
      doctorUuid: sessionStorage.userUUID,
      dateScheduled: finalTime,
      notes: note
    }
    console.log(appt);

    requests.postFutureAppointment(appt)
      .then((res) => {
        console.log("created future appointment sucessfully");
      })
      .catch(function(e){
        console.log("Could not create future appointment");
      });

  }

  render(){
    var patientOptions =[];
    var timeOptions =[];

    for(var k=0; k<11; k++){
      var t;
      if (k < 4){
        t = k+8 + " AM";
      }else if (k == 4) {
        t = k+8 + " PM";
      }
      else{
        t = k-4 + " PM";
      }
      timeOptions.push(<option>{t}</option>);
    }

    this.state.patientsList.forEach(function(patient, index){
      var pDob = moment.unix(patient.dateOfBirth).format("MM/DD/YYYY");
      var patientDescip = patient.name + " (DOB: " + pDob + ")";
      patientOptions.push(<option value={patientDescip}></option>);
    });

    var holderClass = classnames("formContent", {"show":this.state.showForm});

    return (
      <div className="scheduleForm">

        <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.showForm.bind(this)}>New Appointment</button>
        <div>
          <form className={holderClass}>
            <label for="sel1">Select a Patient:</label>

            <datalist id="patientsData">
              {patientOptions}
            </datalist>
            <input ref="selectedPatient" className="form-control" type="text" list="patientsData" placeholder="Type or select patient name from dropdown"></input>

            <label>Select a date:</label>
            <input ref="selectedDate" type="date" id="newAppointmentDate" className="form-control"/>

            <label>Select a time</label>
            <select ref="selectedTime" className="form-control">
              <option selected disabled hidden>Chose Start Time</option>
              {timeOptions}
            </select>

            <label for="note">Note:</label>
            <textarea ref="note" className="form-control" rows="2" id="note" placeholder="Type your notes here..."></textarea>

            <button type="button" className="btn btn-danger" onClick={this.hideForm.bind(this)}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={this.createAppointment.bind(this)}>Create Appointment</button>
          </form>
        </div>

      </div>
		);
	}
}

export default Schedule;
