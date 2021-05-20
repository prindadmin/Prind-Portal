import React from 'react';
import { shallow } from 'enzyme';

import Component from './ProjectInvitationTile'
//import * as Strings from '../../../../Data/Strings'

var props = {
  requestDetails: {
    projectId: "123",
    projectName: "Test Project 123",
    requestedBy: "bbbb-bbbb-bbbbbbbb-bbbb-bbbb",
    requestedAt: "2021-03-30T08:13:45",
    roleId: "client",
    requestedByUser: "Test Testerson",
  },
  respondToProjectInvitation: jest.fn(),
}


it('should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('should render and accept invitation', () => {
  const mockRespondToProjectInvitation = jest.fn()
  props.respondToProjectInvitation = mockRespondToProjectInvitation

  const component = shallow(<Component {...props} />);
  component.find('#accept-button').simulate('click')
  expect(mockRespondToProjectInvitation).toHaveBeenCalledWith("123", true)
});


it('should render and reject invitation', () => {
  const mockRespondToProjectInvitation = jest.fn()
  props.respondToProjectInvitation = mockRespondToProjectInvitation

  const component = shallow(<Component {...props} />);
  component.find('#reject-button').simulate('click')
  expect(mockRespondToProjectInvitation).toHaveBeenCalledWith("123", false)
});
