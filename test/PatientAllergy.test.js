import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import PatientAllergy from '../src/PatientAllergy';

describe('<PatientAllergy/>', function () {
  it('should have initial state', () => {
    const wrapper = mount(<PatientAllergy/>);
    expect(wrapper.state().showBtn).to.equal(false);
  });

  it('should render .PatientAllergy module', () => {
    const wrapper = mount(<PatientAllergy/>);
    expect(wrapper.find('.PatientAllergy')).to.have.length(1);
  });

  it('should display correct allergyInfo upon prop update', () => {
    let dummyAllergyInfo = "allergy info here";
    const wrapper = mount(<PatientAllergy allergyInfo={dummyAllergyInfo}/>);
    expect(wrapper.ref('allergies').text()).to.equal('allergy info here');
  });
});
