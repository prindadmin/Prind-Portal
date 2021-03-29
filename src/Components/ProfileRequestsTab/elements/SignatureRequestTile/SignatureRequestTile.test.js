import React from 'react';
import { shallow, mount } from 'enzyme';

import Component from './SignatureRequestTile'

var props;
var mockRejectSignatureRequest;
var mockUpdateChosenProject;
var mockHistoryPush;

beforeEach(() => {
  mockRejectSignatureRequest = jest.fn(() => { return; });
  mockUpdateChosenProject = jest.fn(() => { return; });
  mockHistoryPush = jest.fn()

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
    },
    history: {
      push: mockHistoryPush
    }
  };
});

it('Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render and click go to document and resolve', () => {
  const mockUpdateChosenProjectWithSuccess = jest.fn((data, resolve, reject) => {
    resolve()
  })
  props.updateChosenProject = mockUpdateChosenProjectWithSuccess

  const component = shallow(<Component {...props} />);
  const documentButton = component.find('#go-to-document-button')
  documentButton.simulate('click')
  expect(mockUpdateChosenProjectWithSuccess).toHaveBeenCalledWith(
    {
    projectId: props.requestDetails.projectID,
    projectName: props.requestDetails.projectName,
    },
    expect.any(Function),
    expect.any(Function),
  )
  expect(mockHistoryPush).toHaveBeenCalledWith({
    pathname: "design/123",
    state: {
      fieldID: "2",
      openProjectSelector: false,
    }
  })
});

it('Should render and click reject signature and resolve', () => {
  const mockRejectSignatureRequestWithSuccess = jest.fn((data, resolve, reject) => {
    resolve()
  })
  props.rejectSignatureRequest = mockRejectSignatureRequestWithSuccess

  const component = shallow(<Component {...props} />);
  const rejectButton = component.find('#reject-signature-request-button')
  rejectButton.simulate('click')
  expect(mockRejectSignatureRequestWithSuccess).toHaveBeenCalledWith(
    props.requestDetails,
    expect.any(Function),
    expect.any(Function),
  )
});

it('Should render and click reject signature and reject', () => {
  const mockRejectSignatureRequestWithFailure = jest.fn((data, resolve, reject) => {
    reject()
  })
  props.rejectSignatureRequest = mockRejectSignatureRequestWithFailure

  const component = shallow(<Component {...props} />);
  const rejectButton = component.find('#reject-signature-request-button')
  rejectButton.simulate('click')
  expect(mockRejectSignatureRequestWithFailure).toHaveBeenCalledWith(
    props.requestDetails,
    expect.any(Function),
    expect.any(Function),
  )
});
