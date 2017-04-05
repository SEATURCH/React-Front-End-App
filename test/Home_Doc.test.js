import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Home_Doc from '../src/Home_Doc';
import Comp from '../src/Auth/CustomComp';
import moment from 'moment';

describe('<Home_Doc/>', function () {
  it('should have initial state', () => {
    const wrapper = mount(<Home_Doc/>);
    expect(wrapper.state()).to.deep.equal({
      showForm: false,
			patientsList: [],
      search: ''
		});
  });

  it('should render table of patients', () => {
    const wrapper = mount(<Home_Doc/>);
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('should render NewPatientForm', () => {
    const wrapper = mount(<Home_Doc/>);
    expect(wrapper.find('.formContent')).to.have.length(2);
    expect(wrapper.find(Comp.ValidatedInput)).to.have.length(14); // 7 for each NewPatientForm
  });

  it('should render rows of patient data if patientsList.length > 0', () => {
    const wrapper = mount(<Home_Doc/>);
    wrapper.setState({
      patientsList: [{
        patientUUID: 1,
        address: "a",
        bloodType: "b",
        dateOfBirth: 0,
        emergencyContact: "c",
        gender: "d",
        medicalNumber: "123",
        name: "e",
        notes: "f",
        phoneNumber: "456"
      }]
    });
    wrapper.update();
    expect(wrapper.find('tbody')).to.have.length(1);
  });

  it('should set search state upon update', () => {
    const wrapper = mount(<Home_Doc/>);
    wrapper.find('input[name="search"]').simulate('change', {target: {value: 'abcdefg'}});
    expect(wrapper.state().search).to.equal('abcdefg');
  });
});
