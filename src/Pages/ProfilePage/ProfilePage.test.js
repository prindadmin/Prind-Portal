import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactGA from 'react-ga';

import Component from './ProfilePage'

var props;

var mockGetUserDetails = jest.fn((resolve, reject) => { resolve() })
var mockGetProjectInvitations = jest.fn((resolve, reject) => { resolve() })
var mockGetSignatureRequests = jest.fn((resolve, reject) => { resolve() })
var mockGetHistory = jest.fn((resolve, reject) => { resolve() })

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
  global.open = jest.fn()
});

beforeEach(() => {
  props = {
    getUserDetails: mockGetUserDetails,
    getProjectInvitations: mockGetProjectInvitations,
    getSignatureRequests: mockGetSignatureRequests,
    getHistory: mockGetHistory,
    location: {
      pathname: "/profile",
      state: {},
    },
    fetching: false
  }
})

it('Profile Page - Should render user tab', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  expect(mockGetUserDetails).toHaveBeenCalled()
  expect(mockGetProjectInvitations).toHaveBeenCalled()
  expect(mockGetSignatureRequests).toHaveBeenCalled()
  expect(mockGetHistory).toHaveBeenCalled()
});


it('Profile Page - Should render history tab', () => {
  props.location.state = {
    tabToOpen: "history"
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  expect(mockGetUserDetails).toHaveBeenCalled()
  expect(mockGetProjectInvitations).toHaveBeenCalled()
  expect(mockGetSignatureRequests).toHaveBeenCalled()
  expect(mockGetHistory).toHaveBeenCalled()
});


it('Profile Page - Should render requests tab', () => {
  props.location.state = {
    tabToOpen: "requests"
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  expect(mockGetUserDetails).toHaveBeenCalled()
  expect(mockGetProjectInvitations).toHaveBeenCalled()
  expect(mockGetSignatureRequests).toHaveBeenCalled()
  expect(mockGetHistory).toHaveBeenCalled()
});

/*
it('Profile Page - Should render requests tab then change to history tab', () => {
  const component = mount(<Component {...props} />);
  expect(component).toMatchSnapshot();
  const historyTabButton = component.find('#history')
  historyTabButton.simulate('click')
  expect(component).toMatchSnapshot();
});
*/
