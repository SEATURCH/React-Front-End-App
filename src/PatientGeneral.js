import React, { Component } from 'react';
import './css/PatientGeneral.scss';

class PatientGeneral extends Component {

  render() {
    return (
      <div className="GeneralList">

          <p><b>First Name:</b> {this.props.generalInfo.firstName}</p>
          <p><b>Last Name:</b> {this.props.generalInfo.lastName}</p>
          <p><b>Gender:</b> {this.props.generalInfo.gender}</p>
          <p><b>Medical Number:</b> {this.props.generalInfo.medicalNumber}</p>
          <p><b>User ID:</b> {this.props.generalInfo.userId}</p>
          <p><b>Date of Birth:</b> {this.props.generalInfo.birthDate}</p>
          <p><b>Contact Info:</b> {this.props.generalInfo.contactInfo}</p>
          <p><b>Address:</b> {this.props.generalInfo.address}</p>
          <p><b>Primary Doctor:</b> {this.props.generalInfo.primaryDoctor}</p>

      </div>
    );
  }
}

export default PatientGeneral;
