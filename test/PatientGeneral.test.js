import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import PatientGeneral from '../src/PatientGeneral';
import Comp from '../src/Auth/CustomComp';
import moment from 'moment';

describe('<PatientGeneral/>', function () {
  it('should have initial patientInfo state', () => {
    const wrapper = mount(<PatientGeneral/>);
    expect(wrapper.state().patientInfo).to.deep.equal({});
  });

  it('should render 8 <Comp.ValidatedInput> components', () => {
    const wrapper = mount(<PatientGeneral/>);
    expect(wrapper.find(Comp.ValidatedInput)).to.have.length(8);
  });

  it('should render a <Comp.TextInput> component', () => {
    const wrapper = mount(<PatientGeneral/>);
    expect(wrapper.find(Comp.TextInput)).to.have.length(1);
  });

  it('should render a <Comp.SaveButtons> component', () => {
    const wrapper = mount(<PatientGeneral/>);
    expect(wrapper.find(Comp.SaveButtons)).to.have.length(1);
  });

  it('should update patientInfo state after receiving updated props', () => {
    let dummyid=1;
    let dummyInfo = {
      patientUUID: dummyid,
      name: 'greg'
    };
    const wrapper = mount(<PatientGeneral/>);
    wrapper.setProps({generalInfo: dummyInfo});
    expect(wrapper.state('patientInfo')).to.deep.equal(dummyInfo);
  });

  it('should call componentWillReceiveProps', () => {
    let dummyid=1;
    let dummyInfo = {
      patientUUID: dummyid,
      name: 'greg'
    };
    sinon.spy(PatientGeneral.prototype, 'componentWillReceiveProps');
    const wrapper = mount(<PatientGeneral/>);
    wrapper.setProps({generalInfo: dummyInfo});
    expect(PatientGeneral.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
  });

  it('should show correctly updated values on Comp.ValidatedInput and Comp.TextInput', () => {
    let dummyid=1;
    let dummyInfo = {
      patientUUID: dummyid,
      address: "a",
      bloodType: "b",
      dateOfBirth: 0,
      emergencyContact: "c",
      gender: "d",
      medicalNumber: "123",
      name: "e",
      notes: "f",
      phoneNumber: "456"
    };
    const wrapper = mount(<PatientGeneral/>);
    wrapper.setProps({generalInfo: dummyInfo});
    expect(wrapper.ref('name').prop('value')).to.equal('e');
    expect(wrapper.ref('gender').prop('value')).to.equal('d');
    expect(wrapper.ref('bloodType').prop('value')).to.equal('b');
    expect(wrapper.ref('dateOfBirth').prop('value')).to.equal(moment.unix(0).format("YYYY-MM-DD"));
    expect(wrapper.ref('medicalNumber').prop('value')).to.equal('123');
    expect(wrapper.ref('allergies').prop('value')).to.equal('f');
    expect(wrapper.ref('phoneNumber').prop('value')).to.equal('456');
    expect(wrapper.ref('emergencyContact').prop('value')).to.equal('c');
    expect(wrapper.ref('address').prop('value')).to.equal('a');
  });

  /*
  it('should correctly update state upon submiteUpdate', () => {
    let dummyid = 1;
    const wrapper = mount(<PatientGeneral patientuuid={dummyid}/>);

    //wrapper.ref('name').get(0).value = 'a';
    //wrapper.ref('gender').get(0).value = 'b';
    //wrapper.ref('bloodType').get(0).value = 'c';
    //wrapper.ref('medicalNumber').get(0).value = '123';
    //wrapper.ref('allergies').get(0).value = 'd';
    //wrapper.ref('phoneNumber').get(0).value = '789';
    //wrapper.ref('emergencyContact').get(0).value = 'e';
    //wrapper.ref('address').get(0).value = 'f';
    //wrapper.ref('dateOfBirth').get(0).value = moment.unix(0).format("YYYY-MM-DD");
    //wrapper.ref('save').simulate('click');

    expect(wrapper.find({ref: 'name'})).to.have.length(1);
    //expect(wrapper.state('patientInfo')).to.deep.equal({
    //  patientUUID: 1,
    //  notes: 'd',
    //  name: 'a',
    //  gender: 'b',
    //  dateOfBirth: moment(moment.unix(0).format("YYYY-MM-DD")).unix(),
    //  bloodType: 'c',
    //  medicalNumber: '123',
    //  phoneNumber: '789',
    //  emergencyContact: 'e',
    //  address: 'f'
    //});

  });
  */
});
