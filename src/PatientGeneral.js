import React, { Component } from 'react';

class PatientGeneral extends Component {

  render() {
    return (
      <div className="GeneralList module">
        <h3 className="modeleHeader">Patient Profile</h3>
        <div className="PatientInfo">
          <h4 className="moduleSubHeader">Patient Info</h4>
          <p><b>Name:</b> {this.props.generalInfo.name}</p>
          <p><b>Gender:</b> {this.props.generalInfo.gender}</p>
          <p><b>Date of Birth:</b> {this.props.generalInfo.dateOfBirth}</p>
          <p><b>UUID:</b> {this.props.generalInfo.patientUUID}</p>
          <p><b>Blood Type:</b> {this.props.generalInfo.bloodType}</p>
          <p><b>Medical Number:</b> {this.props.generalInfo.medicalNumber}</p>
        </div>
        <div className="ContactInfo">
          <h4 className="moduleSubHeader">Patient Contacts</h4>
          <p><b>Phone Number:</b> {this.props.generalInfo.phoneNumber}</p>
          <p><b>Emergency Contact:</b> {this.props.generalInfo.emergencyContact}</p>
          <p><b>Address:</b> {this.props.generalInfo.address}</p>
        </div>
        <div className="Notes">
          <h4 className="moduleSubHeader">Notes</h4>
          {this.props.generalInfo.notes}
        </div>
      </div>
    );
  }
}

export default PatientGeneral;
