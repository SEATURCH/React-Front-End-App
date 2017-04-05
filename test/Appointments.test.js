import React from 'react';
import { mount, shallow } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

import PatientPrescription from '../src/PatientPrescription';
import Appointments from '../src/Appointments';
import Comp from '../src/Auth/CustomComp';
import moment from 'moment';

chai.use(chaiEnzyme());
var expect = chai.expect;

describe('<Appointments/>', function () {
  it('should have initial state', () => {
    let loc = {
      query: {
        appt: "6b8337bb-b602-4141-aff0-eb52617f1ef9",
        id: "36cb5853-758b-44ec-86b4-55cbac3c8afd"
      }
    };
    const wrapper = mount(<Appointments location={loc}/>);
    expect(wrapper.state().showBtn).to.equal(false);
    expect(wrapper.state().generalInfoList).to.deep.equal({});
    expect(wrapper.state().prescriptionList).to.deep.equal([]);
    expect(wrapper.state().appointmentDetail.appointmentUUID).to.equal("6b8337bb-b602-4141-aff0-eb52617f1ef9");
    expect(wrapper.state().appointmentDetail.patientUUID).to.equal("36cb5853-758b-44ec-86b4-55cbac3c8afd");
    expect(wrapper.state().appointmentDetail.dateVisited).to.equal(0);
    expect(wrapper.state().appointmentDetail.breathingRate).to.equal(0);
    expect(wrapper.state().appointmentDetail.heartRate).to.equal(0);
    expect(wrapper.state().appointmentDetail.bloodOxygenLevel).to.equal(0);
    expect(wrapper.state().appointmentDetail.bloodPressure).to.equal(0);
    expect(wrapper.state().appointmentDetail.notes).to.deep.equal({
        chiefComplaints:[],
        doctorNotes:[]
    });
    expect(wrapper.state().chiefComp).to.equal("");
    expect(wrapper.state().doctorNotes).to.equal("");
    expect(wrapper.state().addedPrescript).to.deep.equal([]);
  });

  it('should render all components inside .DetailedAppointments', () => {
    let loc = {
      query: {
        appt: "6b8337bb-b602-4141-aff0-eb52617f1ef9",
        id: "36cb5853-758b-44ec-86b4-55cbac3c8afd"
      }
    };
    const wrapper = mount(<Appointments location={loc}/>);
    wrapper.setState({
      generalInfoList: {
        name: 'pn1',
        notes: 'notes0'
      },
      prescriptionList: [{
        doctorName:"a",
        startDate:0,
        endDate:1,
        name:"b",
        notes:"c"
      }, {
        doctorName:"d",
        startDate:2,
        endDate:3,
        name:"e",
        notes:"f"
      }],
      appointmentDetail: {
        dateVisited: 1,
        notes: {
          chiefComplaints: [{date: 2, value: 'aaa'}],
          doctorNotes: [{date: 3, value: 'bbb'}]
        }
      },
      chiefComp: 'cf1',
      doctorNotes: "notes1",
      addedPrescript: [{name: 'ap1', endDate: 4, notes: 'g'}]
    });
    wrapper.update();

    expect(wrapper.find(Comp.SaveButtons)).to.have.length(1);
    expect(wrapper.find(PatientPrescription)).to.have.length(1);
    expect(wrapper.find('table')).to.have.length(4); // 2 TextTables, 1 table, 1 table in PatientPrescription
  });

  it('should contain correct values inside components after updating state', () => {
    let loc = {
      query: {
        appt: "6b8337bb-b602-4141-aff0-eb52617f1ef9",
        id: "36cb5853-758b-44ec-86b4-55cbac3c8afd"
      }
    };
    const wrapper = mount(<Appointments location={loc}/>);
    wrapper.setState({
      generalInfoList: {
        name: 'pn1',
        notes: 'notes0'
      },
      prescriptionList: [{
        doctorName:"a",
        startDate:0,
        endDate:1,
        name:"b",
        notes:"c"
      }, {
        doctorName:"d",
        startDate:2,
        endDate:3,
        name:"e",
        notes:"f"
      }],
      appointmentDetail: {
        dateVisited: 1,
        notes: {
          chiefComplaints: [{date: 2, value: 'aaa'}],
          doctorNotes: [{date: 3, value: 'bbb'}]
        }
      },
      chiefComp: 'cf1',
      doctorNotes: "notes1",
      addedPrescript: [{name: 'ap1', endDate: 4, notes: 'g'}]
    });
    wrapper.update();

    let today = moment().format("MMM/DD/YYYY");
    let dateVisited = moment.unix(1).format("MMM/DD/YYYY");
    expect(wrapper.find('h1')).to.have.text('Appointment ' + dateVisited);
    expect(wrapper.find('h2')).to.have.text('pn1');
    expect(wrapper.ref('chiefComplaints').prop('value')).to.equal('cf1');
    expect(wrapper.find('.allergiesText')).to.have.value('notes0');
    expect(wrapper.ref('doctorNotes').prop('value')).to.equal('notes1');
    expect(wrapper.ref('drugName0').prop('value')).to.equal('ap1');
    expect(wrapper.ref('endDate0').prop('value')).to.equal(moment.unix(4).format("YYYY-MM-DD"));
    expect(wrapper.ref('notes0').prop('value')).to.equal('g');
  });
});
