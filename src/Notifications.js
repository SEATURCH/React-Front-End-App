import React, { Component } from 'react';
import requests from './requests';
import './css/Notifications.scss'
import classnames from 'classnames';

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
    console.log("Form should be visible: " + this.state.showForm);
  }

  hideForm(event) {
    event.preventDefault()
    this.setState({
      showForm:false
    });
    console.log("Form should be visible: " + this.state.showForm);
  }

  //searches the list to find the object based on the given name
  findDocIndex(name, list){
      var doc = {};
      list.forEach(function(elem) {
        if(elem.name === name){
            doc = {
              doctorUUID: elem.doctorUUID,
              name: elem.name,
              phoneNumber: elem.phoneNumber,
              primaryFacility: elem.primaryFacility,
              primarySpeciality: elem.primarySpeciality,
              gender: elem.gender
            };
        }
      });
      return doc;
  }
  //Posts the notification to the appropriate doctor.
  sendNotification(event) {
    event.preventDefault()
    const name = this.refs.doctor.value;
    if(name !== "Chose one"){
      const message = this.refs.message.value;
      if(message !== ""){
        var doc = this.findDocIndex(name, this.props.docs);

        console.log(name);
        console.log(message);
        console.log(doc);
      }else{
        alert("Please write a message and try again!");
      }

    }else{
      alert("Please select a recipient and try again!");
    }
  }

  render(){
    var docOptions =[];

  	this.props.docs.forEach(function(doc, index){
		    docOptions.push(<option>{doc.name}</option>);
    });

    var holderClass = classnames("formContent", {"show":this.state.showForm});

    return (
      <div className="notificationForm">

        <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.showForm.bind(this)}>New Notificaiton</button>
        <div>
          <form className={holderClass}>
            <label for="sel1">Select a Medical Professional:</label>
            <select ref="doctor" className="form-control" id="sel1">
              <option selected disabled hidden>Chose one</option>
              {docOptions}
            </select>

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
			notifcationsList:  [
                            {
                              "senderUUID": "576bd460-7b4d-432d-ba56-5a57553cb30b",
                              "receiverUUID": "36b95ee0-3742-42a1-a521-ecbb2528e2a4",
                              "senderName": "Bruce Banner",
                              "message": "Blood Reports are available."
                            },
                            {
                              "senderUUID": "8bbd9f18-829b-4011-a451-df571b369796",
                              "receiverUUID": "36b95ee0-3742-42a1-a521-ecbb2528e2a4",
                              "senderName": "S. Strange",
                              "message": "I have uploaded the reports."
                            },
                            {
                              "senderUUID": "45b2bf07-0ef4-478f-ae91-a9229332c17a",
                              "receiverUUID": "36b95ee0-3742-42a1-a521-ecbb2528e2a4",
                              "senderName": "Thor",
                              "message": "Please analyze the MRI report for Iron Man"
                            },
                            {
                              "senderUUID": "0636a4f0-b6d4-452a-88d9-574dc6ffca81",
                              "receiverUUID": "36b95ee0-3742-42a1-a521-ecbb2528e2a4",
                              "senderName": "Steve Rogers",
                              "message": "Doc, I need your suggestions. Please contract me."
                            }
                          ],
      doctorsList: [
                      {
                        "doctorUUID": "556d9f18-829b-4011-a451-df571b369111",
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
