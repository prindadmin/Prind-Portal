import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactGA from 'react-ga';

import Component from './ProfilePage'

var props;
const mockGetUserDetails = jest.fn()
const mockGetProjectInvitations = jest.fn()
const mockGetSignatureRequests = jest.fn()
const mockGetHistory = jest.fn()


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
  const mockGetUserDetailsSuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  const mockGetProjectInvitationsSuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  const mockGetSignatureRequestsSuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  const mockGetHistorySuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })

  props = {
    getUserDetails: mockGetUserDetailsSuccess,
    getProjectInvitations: mockGetProjectInvitationsSuccess,
    getSignatureRequests: mockGetSignatureRequestsSuccess,
    getHistory: mockGetHistorySuccess,
    location: {
      pathname: "/profile",
      state: {},
    },
    fetching: false
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  expect(mockGetUserDetailsSuccess).toHaveBeenCalled()
  expect(mockGetProjectInvitationsSuccess).toHaveBeenCalled()
  expect(mockGetSignatureRequestsSuccess).toHaveBeenCalled()
  expect(mockGetHistorySuccess).toHaveBeenCalled()
});


it('Profile Page - Should render history tab', () => {
  const mockGetUserDetailsSuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  const mockGetProjectInvitationsSuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  const mockGetSignatureRequestsSuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  const mockGetHistorySuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  props = {
    getUserDetails: mockGetUserDetailsSuccess,
    getProjectInvitations: mockGetProjectInvitationsSuccess,
    getSignatureRequests: mockGetSignatureRequestsSuccess,
    getHistory: mockGetHistorySuccess,
    location: {
      pathname: "/profile",
      state: {
        tabToOpen: "history"
      },
    },
    fetching: false
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  expect(mockGetUserDetailsSuccess).toHaveBeenCalled()
  expect(mockGetProjectInvitationsSuccess).toHaveBeenCalled()
  expect(mockGetSignatureRequestsSuccess).toHaveBeenCalled()
  expect(mockGetHistorySuccess).toHaveBeenCalled()
});


it('Profile Page - Should render requests tab', () => {
  const mockGetUserDetailsSuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  const mockGetProjectInvitationsSuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  const mockGetSignatureRequestsSuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  const mockGetHistorySuccess = jest.fn((resolve, reject) => {
    resolve("Success")
  })
  props = {
    getUserDetails: mockGetUserDetailsSuccess,
    getProjectInvitations: mockGetProjectInvitationsSuccess,
    getSignatureRequests: mockGetSignatureRequestsSuccess,
    getHistory: mockGetHistorySuccess,
    location: {
      pathname: "/profile",
      state: {
        tabToOpen: "requests"
      },
    },
    fetching: false
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  expect(mockGetUserDetailsSuccess).toHaveBeenCalled()
  expect(mockGetProjectInvitationsSuccess).toHaveBeenCalled()
  expect(mockGetSignatureRequestsSuccess).toHaveBeenCalled()
  expect(mockGetHistorySuccess).toHaveBeenCalled()
});


it('Profile Page - Should render with failed fetches', () => {
  const mockGetUserDetailsFailed = jest.fn((resolve, reject) => {
    reject("Failed")
  })
  const mockGetProjectInvitationsFailed = jest.fn((resolve, reject) => {
    reject("Failed")
  })
  const mockGetSignatureRequestsFailed = jest.fn((resolve, reject) => {
    reject("Failed")
  })
  const mockGetHistoryFailed = jest.fn((resolve, reject) => {
    reject("Failed")
  })

  props = {
    getUserDetails: mockGetUserDetailsFailed,
    getProjectInvitations: mockGetProjectInvitationsFailed,
    getSignatureRequests: mockGetSignatureRequestsFailed,
    getHistory: mockGetHistoryFailed,
    location: {
      pathname: "/profile",
      state: {},
    },
    fetching: false
  }
  const component = shallow(<Component {...props} />);
  expect(mockGetUserDetailsFailed).toHaveBeenCalled()
  expect(mockGetProjectInvitationsFailed).toHaveBeenCalled()
  expect(mockGetSignatureRequestsFailed).toHaveBeenCalled()
  expect(mockGetHistoryFailed).toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});

// TODO: FUTURE: Simulate a tab change
