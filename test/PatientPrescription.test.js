import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import PatientPrescription from '../src/PatientPrescription';

describe('<PatientPrescription/>', function () {
  it('should allow setting props', function () {
    let list=[];
    const wrapper = mount(<PatientPrescription prescriptionList={list}/>);
    expect(wrapper.props().prescriptionList).to.deep.equal([]);
    list=[{
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
    }];
    wrapper.setProps({prescriptionList: list});
    expect(wrapper.props().prescriptionList).to.deep.equal(list);
  });

  it('should wrap content in a div with class .PatientPrescription', () => {
    let dummyList = [];
    const wrapper = shallow(<PatientPrescription prescriptionList={dummyList}/>);
    expect(wrapper.find('.PatientPrescription')).to.have.length(1);
  });
});
