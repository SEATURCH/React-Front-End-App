import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import PatientAppointments from '../src/PatientAppointments';

describe('<PatientAppointments>', function () {
  /*
  it('contains an <AppTable/> component', function () {
    const wrapper = mount(<PatientAppointments/>);
    expect(wrapper.find(AppTable)).to.have.length(1);
  });

  it('contains an <AppRow/> component', function () {
    const wrapper = mount(<PatientAppointments/>);
    expect(wrapper.find(AppRow)).to.have.length(1);
  });
  */
  it('should allow setting props', function () {
    let list = [];
    const wrapper = mount(<PatientAppointments appointmentList={list}/>);
    expect(wrapper.props().appointmentList).to.deep.equal([]);
    list = [{date: 1486754955}, {date:1483848461}];
    wrapper.setProps({appointmentList: list});
    expect(wrapper.props().appointmentList).to.deep.equal([{date: 1486754955}, {date:1483848461}]);
  });

  it('should wrap content in a div with class .PatientAppointments', ()=>{
    let dummyList=[];
    const wrapper = shallow(<PatientAppointments appointmentList={dummyList}/>);
    expect(wrapper.find('.PatientAppointments')).to.have.length(1);
  });
});
