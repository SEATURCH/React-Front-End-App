import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Documents from '../src/Documents';
import moment from 'moment';

describe('<Documents.DocuList/>', function () {
  it('should have initial state', () => {
    let loc = {
      query: {
        id: "75264cc0-ff8a-4bd3-93da-9e07ae661229"
      }
    };
    const wrapper = mount(<Documents.DocuList location={loc}/>);
    expect(wrapper.state()).to.deep.equal({documentsList: []});
  });

  it('should render .documents div and DocumentsTable', () => {
    let dummyList = [
      {
        documentUUID: "ba0682ac-09ef-4845-b18e-889e28fe0c9e",
        patientUUID : "75264cc0-ff8a-4bd3-93da-9e07ae661229",
        filename: "Blood Report",
        dateUploaded: "1486292557"
      },
      {
        documentUUID: "dc5cf078-ebe3-4632-b883-e675dfba9015",
        patientUUID : "75264cc0-ff8a-4bd3-93da-9e07ae661229",
        filename: "Heart Report",
        dateUploaded: "1486572515"
      },
      {
        documentUUID: "ee0734fe-70fc-4689-9837-6917008740be",
        patientUUID : "75264cc0-ff8a-4bd3-93da-9e07ae661229",
        filename: "Lungs Report",
        dateUploaded: "1486753955"
      }
    ];
    let loc = {
      query: {
        id: "75264cc0-ff8a-4bd3-93da-9e07ae661229"
      }
    };
    const wrapper = mount(<Documents.DocuList location={loc}/>);
    wrapper.setState({documentsList: dummyList});
    expect(wrapper.find('.documents')).to.have.length(1);
    expect(wrapper.find('table')).to.have.length(1);
  });


});
