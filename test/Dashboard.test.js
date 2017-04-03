import React from 'react';
import { mount, shallow } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon';

import PatientPrescription from '../src/PatientPrescription';
import PatientAppointments from '../src/PatientAppointments';
import PatientProfile from '../src/PatientGeneral';
import Dashboard from '../src/Dashboard';

chai.use(chaiEnzyme()) // Note the invocation at the end

describe('<Dashboard/>', function () {
  it('should have initial state', () => {
    let loc = {
      query: {
        id: "75264cc0-ff8a-4bd3-93da-9e07ae661229"
      }
    };
    const wrapper = mount(<Dashboard location={loc}/>);
    chai.expect(wrapper.state()).to.deep.equal({
			generalInfoList: {
				patientUUID: "",
				address: "",
				bloodType: "",
				dateOfBirth: 0,
				emergencyContact: "",
				gender: "",
				medicalNumber: "",
				name: "",
				notes: "",
				phoneNumber: ""
			},
			prescriptionList:[{
					doctorName:"",
					startDate:0,
					endDate:0,
					name:"",
					notes:""
				}],
			appointmentList: [],
			problemsList: {}
		});
  });

  it('should render Dashboard components properly', () => {
    let loc = {
      query: {
        id: "75264cc0-ff8a-4bd3-93da-9e07ae661229"
      }
    };
    const wrapper = mount(<Dashboard location={loc}/>);
    wrapper.setState({
      generalInfoList: {
        patientUUID: "75264cc0-ff8a-4bd3-93da-9e07ae661229",
        address: "a",
        bloodType: "b",
        dateOfBirth: 0,
        emergencyContact: "c",
        gender: "d",
        medicalNumber: "123",
        name: "e",
        notes: "f",
        phoneNumber: "456"
      },
      prescriptionList:[{
				doctorName: "d1",
				startDate:1,
				endDate:2,
				name:"p1",
				notes:"n1"
			}, {
        doctorName: "d2",
        startDate: 3,
        endDate: 4,
        name: "p2",
        notes: "n2"
      }],
			appointmentList: [{date: 1486754955}, {date:1483848461}]
		});
    //expect(wrapper.find('h2')).to.have.length(1);
    chai.expect(wrapper.find('h2')).to.have.text('e');
    chai.expect(wrapper.find(PatientAppointments)).to.have.length(1);
    chai.expect(wrapper.find(PatientPrescription)).to.have.length(1);
    chai.expect(wrapper.find(PatientProfile)).to.have.length(1);
  });
});
