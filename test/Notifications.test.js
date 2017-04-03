import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Notifications from '../src/Notifications';
import moment from 'moment';

describe('<Notifications/>', function () {
  it('should have initial state', () => {
    let initState = {
      notificationsList: [],
      doctorsList: []
    };
    const wrapper = mount(<Notifications/>);
    expect(wrapper.state()).to.deep.equal(initState);
  });

  it('should render NewNotificationForm', () => {
    const wrapper = mount(<Notifications/>);
    wrapper.setState({
      doctorsList: [
        {
          date: 1488254862,
          message: "Have you seen Jean?",
          receiverUUID: "4498720b-0491-424f-8e52-6e13bd33da71",
          senderName: "Cyclops",
          senderUUID: "20a5e81c-399f-4777-8bea-9c1fc2388f37"
        }
      ]
    });
    wrapper.update();
    expect(wrapper.find('.formContent')).to.have.length(1);
  });

  it('should render NotificationsTable if notificationsList.length > 0', () => {
    const wrapper = mount(<Notifications/>);
    wrapper.setState({
      notificationsList: [
        {
          date: 1488254862,
          message: "Have you seen Jean?",
          receiverUUID: "4498720b-0491-424f-8e52-6e13bd33da71",
          senderName: "Cyclops",
          senderUUID: "20a5e81c-399f-4777-8bea-9c1fc2388f37"
        }
      ]
    });
    wrapper.update();
    expect(wrapper.find('table')).to.have.length(1);
  });
});
