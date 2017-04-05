import React from 'react';
import { IndexLink, Link } from 'react-router';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import pubSub from 'pubsub-js';
import AppCont from '../src/AppCont';

describe('<AppCont/>', function () {
  it('should have initial state', () => {
    const wrapper = mount(<AppCont/>);
    expect(wrapper.state().role).to.equal("");
    expect(wrapper.state().uuid).to.equal("");
    expect(wrapper.state().name).to.equal("");
  });

  it('should render doctor app content if role is Doctor', () => {
    const wrapper = mount(<AppCont/>);
    wrapper.setState({
      selectedPatient: "p1",
      uuid: "123",
      role: "Doctor",
      name: "n"
    });
    wrapper.update();
    expect(wrapper.find('div#navMenu')).to.have.length(1);
    expect(wrapper.find(IndexLink)).to.have.length(1);
    expect(wrapper.find(Link)).to.have.length(5); // including IndexLink
    expect(wrapper.findWhere(n => n.props().to === '/Schedule')).to.be.defined;
    expect(wrapper.findWhere(n => n.props().to === '/Schedule').first().text()).to.equal('Schedule');
    expect(wrapper.findWhere(n => n.props().to === '/Notifications')).to.be.defined;
    expect(wrapper.findWhere(n => n.props().to === '/Notifications').first().text()).to.equal('Notifications');
    expect(wrapper.findWhere(n => n.props().to === '/Home_Doc')).to.be.defined;
    expect(wrapper.findWhere(n => n.props().to === '/Home_Doc').first().text()).to.equal('Patients');
    expect(wrapper.find('li.main').first().text()).to.equal('Patient: p1');
  });

  it('should render patient app content if role is Patient', () => {
    const wrapper = mount(<AppCont/>);
    wrapper.setState({
      uuid: "123",
      role: "Patient",
      name: "n"
    });
    wrapper.update();
    expect(wrapper.find('div#navMenu')).to.have.length(1);
    expect(wrapper.find(Link)).to.have.length(2);
    expect(wrapper.findWhere(n => n.props().to === '/Dashboard')).to.be.defined;
    expect(wrapper.findWhere(n => n.props().to === '/Dashboard').first().text()).to.equal('Dashboard');
    expect(wrapper.findWhere(n => n.props().to === '/Documents')).to.be.defined;
    expect(wrapper.findWhere(n => n.props().to === '/Documents').first().text()).to.equal('Documents');
  });
});
