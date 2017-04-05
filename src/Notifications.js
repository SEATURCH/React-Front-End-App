import React, { Component } from 'react';
import requests from './requests';
import './css/Notifications.scss'
import classnames from 'classnames';
import moment from 'moment'

class NotificationRow extends Component{
  render(){
    var notifDate = moment.unix(this.props.date).format("MM/DD/YYYY");
    return (
			<tr>
        <td>{notifDate}</td>
        <td>{this.props.senderName}</td>
        <td>{this.props.message}</td>
			</tr>
		);
	}
}

var NotificationsTable = React.createClass({
  render:function(){
  	var rows =[];
    // create a custome row for each notification
  	this.props.notifications.forEach(function(notification, index){
		    rows.push( <NotificationRow
          message={notification.message}
          senderUUID={notification.senderUUID}
          receiverUUID={notification.receiverUUID}
          senderName={notification.senderName}
          date={notification.dateCreated}
          key={index} /> );
    });

    return (
      <div>
        <table className="table-striped table-hover">
          <thead>
            <tr>
              <th>Date (M/D/Y)</th>
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

class NewNotificationForm extends Component{
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
      var doc;
      if (query){
        // parse query string to extract name and specialty of doctor
        var name = query.substring(0, query.indexOf('(')).trim();
        var specialty = query.substring((query.indexOf(':') + 2), (query.indexOf(')'))).trim();

        list.forEach(function(elem) {
          if(elem.name === name && elem.primarySpecialty === specialty){
              doc = elem;
          }
        });
      }
      return doc;
  }
  //Posts the notification to the appropriate doctor.
  sendNotification(event) {
    event.preventDefault()
    const docDescription = this.refs.doctor.value;
    const message = this.refs.message.value;
    var doc = this.findDocIndex(docDescription, this.props.docs);

    if(!doc){
      alert("Please select a valid recipient!");
    }else if(!message){
      alert("Please write a message and try again!");
    }else{

      var notif = {
        message : message,
        receiverUUID : doc.doctorUUID,
        senderName : requests.whoami().name,
        senderUUID : sessionStorage.userUUID
      }
      console.log(notif);

      requests.postNotification(notif)
        .then((res) => {
          console.log("posted notification sucessfully");
          location.reload();
        })
        .catch(function(e){
          console.log("Couldn't post notification");
        });
    }
  }

  render(){
    var docOptions =[];

  	this.props.docs.forEach(function(doc, index){
        var docDescrip = doc.name + " (Specialty: " + doc.primarySpecialty + ")";
		    docOptions.push(<option value={docDescrip} key={index}></option>);
    });

    var holderClass = classnames("formContent", {"show":this.state.showForm});

    return (
      <div className="notificationForm">

        <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.showForm.bind(this)}>New Notification</button>
        <div>
          <form className={holderClass}>
            <label>Select a Medical Professional:</label>

            <datalist id="docsData">
              {docOptions}
            </datalist>
            <input ref="doctor" className="form-control" type="text"
              list="docsData" placeholder="Type or select recipient from dropdown"></input>

            <label>Message:</label>
            <textarea ref="message" className="form-control" rows="4" id="message" placeholder="Type your message here..."></textarea>

            <button type="button" className="btn btn-danger" onClick={this.hideForm.bind(this)}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={this.sendNotification.bind(this)}>Send Notification</button>
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
			notificationsList: [],
      doctorsList: []
		}
	}

  componentDidMount(){
    requests.getNotificationPageLists()
			.then((result) => {
        console.log("Sucessfully got notifications and doctors list from server.");
        result.notificationsList.sort(function(a, b){
    			return b.dateCreated - a.datedateCreated;
    		});
        this.setState(result);
			})
			.catch(function(e){
				console.log("Could not get notifications or doctors list")
			});
  }

  render() {
    return (
      <div className="notifications">
        <div className="pageHeader">
          <h1 className="mainHeader">Notifications</h1>
        </div>

        <div className="moduleBody">
          <NewNotificationForm docs={this.state.doctorsList}/>

          {this.state.notificationsList.length > 0 &&
              <NotificationsTable notifications={this.state.notificationsList}/>
          }
        </div>
      </div>
    );
  }
}

export default Notifications;
