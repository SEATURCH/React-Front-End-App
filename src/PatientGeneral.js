import React, { Component } from 'react';

class PatientGeneral extends Component {

  render() {
    return (
      <div className="GeneralList">

          <p><b>Name:</b> {this.props.generalInfo.name}</p>
          <p><b>Gender:</b> {this.props.generalInfo.gender}</p>
          <p><b>Medical Number:</b> {this.props.generalInfo.medicalNumber}</p>
          <p><b>UUID:</b> {this.props.generalInfo.patientUUID}</p>
          <p><b>Age:</b> {this.props.generalInfo.dateOfBirth}</p>

      </div>
    );
  }
}

export default PatientGeneral;
