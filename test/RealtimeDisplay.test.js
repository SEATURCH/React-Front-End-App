import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import RealtimeDisplay from '../src/RealtimeDisplay';

describe('<RealtimeDisplay/>', function () {
  it('should render .realtime div', () => {
    const wrapper = mount(<RealtimeDisplay/>);
    expect(wrapper.find('.realtime')).to.have.length(1);
  });
});
