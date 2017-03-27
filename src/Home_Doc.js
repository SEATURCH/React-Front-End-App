import React, { Component } from 'react';
import { Link } from 'react-router';
import requests from './requests';
import moment from 'moment';
import Comp from './Auth/CustomComp.js';
import classnames from 'classnames';
import './css/Home_Doc.scss';

// The Custom Row format that will be displayed in the Patients Table
var CustomRow = React.createClass({
    render: function() {
      var patientAge = moment.unix(this.props.dateOfBirth).format("MM/DD/YYYY");
      return (
        <tr>
          <td><Link to={"Dashboard?id="+this.props.patientUUID} >{this.props.name}</Link></td>
          <td>{this.props.gender}</td>
          <td>{patientAge}</td>
          <td>{this.props.phoneNumber}</td>
        </tr>
      );
    }
});

class NewPatientForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      showForm:false,
      newPatientInfo: {
        address: "",
        bloodType: "",
				dateOfBirth: 0,
				emergencyContact: "",
				gender: "",
				medicalNumber: "",
				name: "",
				notes: "",
				phoneNumber: ""
      }
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

  createNewPatient(event){
    event.preventDefault();
    var patient = {
      notes: this.refs.allergies.value,
      name: this.refs.name.getValue(),
      gender: this.refs.gender.getValue(),
      dateOfBirth: moment(this.refs.dateOfBirth.getValue()).unix(),
      bloodType: this.refs.bloodType.getValue(),
      medicalNumber: this.refs.medicalNumber.getValue(),
      phoneNumber: this.refs.phoneNumber.getValue(),
      emergencyContact: this.refs.emergencyContact.getValue(),
      address: this.refs.address.getValue()
    };

    requests.createPatient(patient)
      .then((res) => {
        console.log("Patient created successfully");
      })
      .catch(function(e){
        console.log("Unable to create patient");
      });
  }

  render(){
    var holderClass = classnames("formContent", {"show":this.state.showForm});
    return (
      <div className="patientForm">

        <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.showForm.bind(this)}>Create New Patient</button>
        <div>
          <form className={holderClass}>
            <div className="col col-md-6">
                <Comp.ValidatedInput ref="name"
                        validation="required" label="Name" name="name" type="text"
                        value={this.state.newPatientInfo.name}
                      errorHelp={{
                        required:"Required"
                      }} />
                <Comp.ValidatedInput ref="gender"
                      validation="required" label="Gender" name="gender" type="text"
                      value={this.state.newPatientInfo.gender}
                      errorHelp={{
                        required:"Required"
                      }} />
                <Comp.ValidatedInput ref="dateOfBirth"
                    validation="required" label="Date of Birth" name="dateOfBirth" type="date"
                    value={moment.unix(this.state.newPatientInfo.dateOfBirth).format("YYYY-MM-DD")}
                      errorHelp={{
                        required:"Required"
                      }} />
                <Comp.ValidatedInput ref="bloodType"
                        validation="required" label="Blood Type" name="bloodType" type="text"
                        value={this.state.newPatientInfo.bloodType}
                      errorHelp={{
                        required:"Required"
                      }} />
                <Comp.ValidatedInput ref="medicalNumber"
                        validation="required" label="Medical Number" name="medicalNumber" type="text"
                        value={this.state.newPatientInfo.medicalNumber}
                      errorHelp={{
                        required:"Required"
                      }} />
                <label htmlFor="allergeisText"><b>Allergies: </b></label>
                <textarea ref="allergies" id="allergeisText">
                          {this.state.newPatientInfo.notes}
                </textarea>
                </div>
                <div className="col col-md-6">
                  <h4 className="moduleSubHeader">Patient Contacts</h4>
                  <Comp.ValidatedInput ref="phoneNumber"
                          validation="required" label="Phone Number" name="phoneNumber" type="text"
                          value={this.state.newPatientInfo.phoneNumber}
                      errorHelp={{
                        required:"Required"
                      }} />
                  <Comp.ValidatedInput ref="emergencyContact"
                        validation="required" label="Emergency Contact" name="emergencyContact" type="text"
                        value={this.state.newPatientInfo.emergencyContact}
                      errorHelp={{
                        required:"Required"
                      }} />
                  <Comp.ValidatedInput ref="address"
                      validation="required" label="Address" name="address" type="text"
                      value={this.state.newPatientInfo.address}
                      errorHelp={{
                        required:"Required"
                      }} />
                  <button type="button" className="btn btn-danger" onClick={this.hideForm.bind(this)}>Cancel</button>
                  <button type="button" className="btn btn-success" onClick={this.createNewPatient.bind(this)}>Create Patient</button>
                </div>

          </form>
        </div>

      </div>
    );
  }
}

class Home_Doc extends Component {
  constructor(props){
		super(props);
		this.state = {
			patientsList: [],
      search: ''
		}
	}

  // call back function that changes the state of 'search' state variable
  updateSearch(event){
    this.setState({search: event.target.value.substr(0,20)});
  }

  componentDidMount(){
		requests.patientsByDocSearch("dummy")
			.then((result) => {
				this.setState({ patientsList:result });
			})
			.catch(function(e){
				console.log("Could not mount request for patients List from Doc")
			});
	}

  render() {
    // create rows with all the patient information if patientsList is not empty
    if (this.state.patientsList.length > 0){
        var rows = [];
        var filteredRows = this.state.patientsList.filter(
            //only return this item if you can find 'this.state.search' inside
            // 'item.name' OR 'item.phoneNumber'...leading to filtering
            (item) => {
              return (item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
                    ||  (item.phoneNumber.indexOf(this.state.search) !== -1);
             }
        );
        // the filtered rows are mapped to a Custom Row with all required info
        filteredRows.forEach(function(item) {
            rows.push(<CustomRow
                name={item.name}
                gender={item.gender}
                dateOfBirth={item.dateOfBirth}
                phoneNumber={item.phoneNumber}
                patientUUID={item.patientUUID}
                key={item.patientUUID} />);
        });
    }

    return (
      <div className="Home_Doc">
        <div className="pageHeader">
            <h1 className="mainHeader">Doctor's Patients</h1>
        </div>
        <div className="moduleBody">
          <form>
            <input type="text" name="search" placeholder="Search Patient ..."
            onChange={this.updateSearch.bind(this)}
            value={this.state.search}/>
          </form>
          <table className="table-striped table-hover" id="allPatientsTable">
             <thead>
                 <tr>
                     <th>Name</th>
                     <th>Gender</th>
                     <th>Date of Birth (M/D/Y)</th>
                     <th>Phone Number</th>
                 </tr>
             </thead>
             {this.state.patientsList.length > 0 &&
               <tbody>
                 {rows}
               </tbody>
             }
          </table>
          <NewPatientForm/>
        </div>
      </div>
    );
  }
}
export default Home_Doc;
