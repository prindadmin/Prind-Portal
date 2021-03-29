import React from 'react';
import { shallow, mount } from 'enzyme';

import Component from './SignatureRequestTile'

var props;
var mockRejectSignatureRequest;
var mockUpdateChosenProject;

beforeEach(() => {
  mockRejectSignatureRequest = jest.fn(() => { return; });
  mockUpdateChosenProject = jest.fn(() => { return; });

  props = {
    rejectSignatureRequest: mockRejectSignatureRequest,
    updateChosenProject: mockUpdateChosenProject,
    requestDetails: {
      requestedAt: "2021-03-29T06:53:31",
      projectID: "123",
      pageName: "design",
      fieldID: "2",
      projectName: "Test Project 1",
      fieldTitle: "Field title 1",
      filename: "filename.txt",
      requestedBy: {
        username: "aaaa-aaaa-aaaaaaaa-aaaa-aaaa-aaaa",
        firstName: "Testy",
        lastName: "McTesterson",
      }
    }
  };
});

it('Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
