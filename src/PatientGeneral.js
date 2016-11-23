import React, { Component } from 'react';
import './css/PatientGeneral.scss';

class PatientGeneral extends Component {

  render() {
    return (
      <div className="GeneralList">

          <p><b>Name:</b> {this.props.generalInfo.name}</p>
          <p><b>Gender:</b> {this.props.generalInfo.gender}</p>
          <p><b>Insurance Number:</b> {this.props.generalInfo.insuranceNumber}</p>
          <p><b>UUID:</b> {this.props.generalInfo.patientUUID}</p>
          <p><b>Age:</b> {this.props.generalInfo.age}</p>

      </div>
    );
  }
}

export default PatientGeneral;
