import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Schedule from '../src/Schedule';
import moment from 'moment';

describe('<Schedule/>', function () {
  it('should have initial state', () => {
    let initState = {
      appointmentsList: [],
      startDate: moment().format("YYYY-MM-DD"),
      endDate: '9999-12-31'
    };
    const wrapper = mount(<Schedule/>);
    expect(wrapper.state()).to.deep.equal(initState);
  });

  it('should render NewAppointmentForm', () => {
    const wrapper = mount(<Schedule/>);
    expect(wrapper.find('.scheduleForm')).to.have.length(1);
  });

  it('should render 2 dateSelectors', () => {
    const wrapper = mount(<Schedule/>);
    expect(wrapper.find('.dateSelector')).to.have.length(2);
  });

  it('should render ScheduleTable if appointmentsList.length > 0', () => {
    const wrapper = mount(<Schedule/>);
    wrapper.setState({appointmentsList: [
      {
        "appointmentUUID": "30c40285-bbf5-4a09-b849-b9aa4c0f9f97",
        "patientUUID": "e572fe98-4662-47f7-930c-cf4f7d13e26e",
        "doctorUUID": "57c7aea1-9fea-422d-ae35-dbf8ce5f5dda",
        "patientName": "Lamar Odom",
        "dateScheduled": 1479463552,
        "dateVisited": 0,
        "notes": "do something"
      }
    ]});
    wrapper.update();
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('should reflect change startDate upon updating state', () => {
    const wrapper = mount(<Schedule/>);
    wrapper.find('#startDateText').simulate('change', {target: {value: 1234567}});
    expect(wrapper.state().startDate).to.equal(moment(1234567).format("MMM/DD/YYYY"));
  });

  it('should reflect change endDate upon updating state', () => {
    const wrapper = mount(<Schedule/>);
    wrapper.find('#endDateText').simulate('change', {target: {value: 1234567}});
    expect(wrapper.state().endDate).to.equal(moment(1234567).format("MMM/DD/YYYY"));
  });
});
