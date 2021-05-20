import React from 'react';
import { shallow } from 'enzyme';

import Component from './ProfileRequestsTab'
//import * as Strings from '../../../../Data/Strings'

var props;

beforeEach(() => {
  props = {
    user: {
      signatureRequests: [
        {
          requestedAt: '1613474390',
          requesterFirstName: 'Ben',
          fieldTitle: 'Brief Description',
          requesterLastName: 'Jeater',
          projectID: 'DemoProjectV1322021-02-16',
          pageName: 'occupation',
          fieldID: '1',
          projectName: 'Demo Project V1.3.2',
          requestedBy: {
            username: 'cb8c0582-fbca-4178-b23d-44bb4096262b',
            firstName: 'Ben',
            lastName: 'Jeater'
          },
          filename: 'Demo Project V1.3.2 - Brief Description.pdf'
        }
      ],
      projectInvitations: [
        {
          projectId: "123",
          projectName: "Test Project 123",
          requestedBy: "bbbb-bbbb-bbbbbbbb-bbbb-bbbb",
          requestedAt: "2021-03-30T08:13:45",
          roleId: "client",
          requestedByUser: "Test Testerson",
        }
      ]
    }
  }
});


it('should render with signatures and invitations', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('should render with signatures and without invitations', () => {
  props.user.projectInvitations = []
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('should render without signatures and with invitations', () => {
  props.user.signatureRequests = []
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('should render without signatures and invitations', () => {
  props.user.signatureRequests = []
  props.user.projectInvitations = []
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
