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
          <p><b>Age:</b> {this.props.generalInfo.age}</p>
          <p><b>Medical Number:</b> {this.props.generalInfo.medicalNumber}</p>
        </div>
        <div className="ContactInfo">
          <h4 className="moduleSubHeader">Patient Contacts</h4>
          <p><b>Phone Number:</b> {this.props.generalInfo.phone}</p>
          <p><b>Emergency Contact:</b> {this.props.generalInfo.emergencyContact}</p>
          <p><b>Address:</b> {this.props.generalInfo.address}</p>
        </div>
        <div className="Demographics">
          <h4 className="moduleSubHeader">Demographics</h4>
          <p><b>Ethnicity:</b> {this.props.generalInfo.ethnicity}</p>
        </div>
        <div className="Notes">
          <h4 className="moduleSubHeader">Notes</h4>
          <form>
            <textarea>
              {this.props.generalInfo.notes}
            </textarea>
          </form>
        </div>
      </div>
    );
  }
}

export default PatientGeneral;
