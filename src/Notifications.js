import React, { Component } from 'react';
import requests from './requests';
import './css/Notifications.scss'
import classnames from 'classnames';
import moment from 'moment'

class NotificationRow extends Component{
  render(){
    return (
			<tr>
        <td>{this.props.senderName}</td>
        <td>{this.props.message}</td>
			</tr>
		);
	}
}

var NotifcationsTable = React.createClass({
  render:function(){
  	var rows =[];
    // create a custome row for each notificaiton
  	this.props.notifcations.forEach(function(notifcation, index){
		    rows.push( <NotificationRow
          message={notifcation.message}
          senderUUID={notifcation.senderUUID}
          receiverUUID={notifcation.receiverUUID}
          senderName={notifcation.senderName}
          key={index}/> );
    });

    return (
      <div>
        <table className="table-striped table-hover">
          <thead>
            <tr>
              <th>From</th>
              <th>Message</th>
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

class NewNotifcationForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      showForm:false
    }
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

  //searches and returns the list to find the object based on the given query
  findDocIndex(query, list){
      var doc = {};
      // parse query string to extract name and speciality of doctor
      var name = query.substring(0, query.indexOf('(')).trim();
      var speciality = query.substring((query.indexOf(':') + 2), (query.indexOf(')'))).trim();

      list.forEach(function(elem) {
        if(elem.name === name && elem.primarySpeciality === speciality){
            doc = elem;
        }
      });
      return doc;
  }
  //Posts the notification to the appropriate doctor.
  sendNotification(event) {
    event.preventDefault()
    const docDescription = this.refs.doctor.value;
    if(docDescription !== "Chose one"){
      const message = this.refs.message.value;
      if(message !== ""){
        var doc = this.findDocIndex(docDescription, this.props.docs);
        var currDate = moment().unix();

        console.log(docDescription);
        console.log(doc);

        var notif = {
          date : currDate,
          message : message,
          receiverUUID : doc.doctorUUID,
          senderName : "Wolverine",
          senderUUID : sessionStorage.userUUID
        }
        console.log(notif);

        requests.postNotification(notif)
  				.then((res) => {
            console.log("posted notifcation sucessfully");
  				})
  				.catch(function(e){
  					console.log("Could not mount")
  				});

      }else{
        alert("Please write a message and try again!");
      }

    }else{
      alert("Please select a recipient and try again!");
    }
  }

  render(){
    var docOptions =[];

  	this.props.docs.forEach(function(doc){
        var docDescrip = doc.name + " (Speciality: " + doc.primarySpeciality + ")";
		    docOptions.push(<option value={docDescrip}></option>);
    });

    var holderClass = classnames("formContent", {"show":this.state.showForm});

    return (
      <div className="notificationForm">

        <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.showForm.bind(this)}>New Notificaiton</button>
        <div>
          <form className={holderClass}>
            <label>Select a Medical Professional:</label>

            <datalist id="docsData">
              {docOptions}
            </datalist>
            <input ref="doctor" className="form-control" type="text"
              list="docsData" placeholder="Type or select recipient from dropdown"></input>

            <label for="message">Message:</label>
            <textarea ref="message" className="form-control" rows="4" id="message" placeholder="Type your message here..."></textarea>

            <button type="button" className="btn btn-danger" onClick={this.hideForm.bind(this)}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={this.sendNotification.bind(this)}>Send Notifcation</button>
          </form>
        </div>

      </div>
		);
	}
}

class Notifications extends Component {
  constructor(props){
		super(props);
		this.state = {
			notifcationsList: [],
      doctorsList: [
                      {
                        "doctorUUID": "4498720b-0491-424f-8e52-6e13bd33da71",
                        "name": "S. Strange",
                        "phoneNumber": "555-222-1111",
                        "primaryFacility": "address",
                        "primarySpeciality": "Liver",
                        "gender": "Male"
                      },
                      {
                        "doctorUUID": "45b2bf07-0ef4-478f-ae91-a9229332c17a",
                        "name": "Thor",
                        "phoneNumber": "444-777-2233",
                        "primaryFacility": "address",
                        "primarySpeciality": "Brain",
                        "gender": "Male"
                      },
                      {
                        "doctorUUID": "0636a4f0-b6d4-452a-88d9-574dc6ffca81",
                        "name": "Steve Rogers",
                        "phoneNumber": "223-222-3142",
                        "primaryFacility": "address",
                        "primarySpeciality": "Stomach",
                        "gender": "Male"
                      },
                      {
                        "doctorUUID": "8bbd9f18-829b-4011-a451-df571b369796",
                        "name": "Natasha Romanoff",
                        "phoneNumber": "999-567-3983",
                        "primaryFacility": "address",
                        "primarySpeciality": "Kidney",
                        "gender": "Female"
                      }
                    ]
		}
	}

  componentDidMount(){
    requests.getNotifications("dummy")
      .then((result) => {
        console.log("Sucessfully got notifications list from server");
        this.setState({ notifcationsList:result });
      })
      .catch(function(e){
        console.log("Could not mount request for patients List from Doc")
      });
  }

  render() {
    return (
      <div className="notifications">
        <h3 className="moduleHeader">Notifications</h3>

        <NewNotifcationForm docs={this.state.doctorsList}/>

        {this.state.notifcationsList.length > 0 &&
            <NotifcationsTable notifcations={this.state.notifcationsList}/>
        }
      </div>
    );
  }
}

export default Notifications;
