import React, { Component } from 'react';
import moment from 'moment'
import requests from './requests';
import './css/Schedule.scss';

class AppointmentRow extends Component{
  render(){
    // when the appointment is compelted (dateScheduled == 0)
    var date;
    if (this.props.dateScheduled == 0){
      date = this.props.dateVisited;
    }else{
      date = this.props.dateScheduled;
    }

    var appDate = moment.unix(date).format("MM/DD/YYYY");
		var startTime = moment.unix(date).format("LT");
		var endTime = moment.unix(date).add("minutes", 30).format("LT");

    // console.log("date is " + date);
    // console.log("reading date " + appDate);
    // console.log("Name is " + this.props.patientName);

		var actionURL = this.props.action === 'Record' ?
			"/appointment/create":"/Appointments?appointmentUUID="+this.props.appointmentUUID;
		return (
			<tr>
				<td>{appDate}</td>
				<td>{startTime} - {endTime}</td>
        <td>{this.props.patientName}</td>
        <td>{this.props.notes}</td>
				{/* <td><Link to={actionURL} >{this.props.action}</Link></td> */}
			</tr>
		);
	}
}

var ScheduleTable = React.createClass({
  render:function(){
  	var rows =[];
    var filteredRows = this.props.appts.filter(
      //only return this item if you can find 'this.state.search' inside
      // 'item.name' OR 'item.phoneNumber'...leading to filtering
      (item) => {
        var date;
        if(item.dateScheduled === 0){
          date = item.dateVisited;
        }else{
          date = item.dateScheduled;
        }
        console.log("Date = " + moment.unix(date).format("MM/DD/YYYY"));
        console.log("Start Date = " + this.props.startDate);
        console.log(moment.unix(date).isSameOrAfter(this.props.startDate));

        console.log("Date = " + moment.unix(date).format("MM/DD/YYYY"));
        console.log("End Date =  " + this.props.endDate);
        console.log(moment.unix(date).isSameOrBefore(this.props.endDate));

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
              <th>Date</th>
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
      // appointmentsList: [{date:1485726115},{date:1485846115},{date:1485723115}],
      appointmentsList: [
                          {
                            "appointmentUUID": "30c40285-bbf5-4a09-b849-b9aa4c0f9f97",
                            "patientUUID": "e572fe98-4662-47f7-930c-cf4f7d13e26e",
                            "doctorUUID": "57c7aea1-9fea-422d-ae35-dbf8ce5f5dda",
                            "patientName": "Cat Woman",
                            "dateScheduled": 1486292557,
                            "dateVisited": 0,
                            "notes": "do something"
                          },
                          {
                            "appointmentUUID": "13c57da1-6f13-4898-b42b-de4252131337",
                            "patientUUID": "6c202b83-1759-40e2-b1c8-7566330366d2",
                            "doctorUUID": "57c7aea1-9fea-422d-ae35-dbf8ce5f5dda",
                            "patientName": "Bat Man",
                            "dateScheduled": 1486572515,
                            "dateVisited": 0,
                            "notes": "do blood test"
                          },
                          {
                            "appointmentUUID": "987b09ee-543b-4dbe-99da-fd9c99202eee",
                            "patientUUID": "6e894f6b-cbf6-4703-ad4f-bd93126450cb",
                            "doctorUUID": "57c7aea1-9fea-422d-ae35-dbf8ce5f5dda",
                            "patientName": "Iron Man",
                            "dateScheduled": 1486753955,
                            "dateVisited": 0,
                            "notes": "check blood pressure"
                          },
                          {
                            "appointmentUUID": "8bbd9f18-829b-4011-a451-df571b369796",
                            "patientUUID": "e572fe98-4662-47f7-930c-cf4f7d13e26e",
                            "doctorUUID": "57c7aea1-9fea-422d-ae35-dbf8ce5f5dda",
                            "patientName": "Lamar Odom",
                            "dateScheduled": 0,
                            "dateVisited": 1483848461,
                            "notes": "had difficulty breathing"
                          }
                        ],
      startDate: '1000-01-01',
      endDate: '5555-12-31'
    }
  }

  updateStartRange(event){
    if(moment(event.target.value).isValid()){
      this.setState({startDate: moment(event.target.value).format("MMM/DD/YYYY")});
    }

  }

  updateEndRange(event){
    if(moment(event.target.value).isValid()){
      this.setState({endDate: moment(event.target.value).format("MMM/DD/YYYY")});
    }
  }

  render(){
    // var current = [];
		// var past = [];
    // var currentTime = new Date().getTime()/1000;
    // console.log(this.state.appointmentsList.length);
    // console.log(this.props.location.query.start);
    // console.log("start Date = " + this.state.startDate);
    // console.log("end Date = " + this.state.endDate);
    // console.log("---------------------------");
    // var x = moment();
    // console.log(x.unix());
    // console.log(x.add(3,'d').add(5.5, 'h').unix());
    // console.log(x.add(2,'d').add(2.4, 'h').unix());
    // console.log(x.subtract(2,'d').unix());
    // console.log(x.subtract(32,'d').add(8.9, 'h').unix());
    // console.log("---------------------------");

    var currentDate = moment();

    return (
      <div className="schedule">
        <h3 className="moduleHeader"> Doctor's Appointments</h3>

        <form>
          <div class="dateSelector">
            <p> From: </p>
            <input type="date" name="start" id="startDateText"
              onChange={this.updateStartRange.bind(this)}
              min="1000-01-01"/>
            {/* <input type="submit" id="startSubmitBtn"/> */}
          </div>

          <div class="dateSelector">
            <p> To: </p>
            <input type="date" name="end" id="endDateText"
              onChange={this.updateEndRange.bind(this)}
              max="5555-12-31"/>
            {/* <input type="submit" id="EndSubmitBtn"/> */}
          </div>

        </form>
        {this.state.appointmentsList.length > 0 &&
            <ScheduleTable appts={this.state.appointmentsList}
              action="Record"
              startDate={this.state.startDate}
              endDate={this.state.endDate}/>
        }

      </div>
    );

  }
}

export default Schedule;
