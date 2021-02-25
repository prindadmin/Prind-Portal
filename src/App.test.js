import React from 'react';
import { shallow, mount } from 'enzyme';

import Component from './App'

beforeEach(() => {
  process.env = Object.assign(process.env, {
    REACT_APP_API_ENDPOINT: "https://nsnhxsl9ul.execute-api.eu-west-1.amazonaws.com/production",
    REACT_APP_REGION: "eu-west-1",
    REACT_APP_USER_POOL_ID: "eu-west-1_nZt8tMfQq",
    REACT_APP_CLIENT_ID: "1usjkta252liocu6l4dfo2j0d5",
    REACT_APP_USER_AUTHORISATION_URL: "https://prind-production-user-pool.auth.eu-west-1.amazoncognito.com/confirmUser",
    REACT_APP_API_NAME: "PrinDFrontEndAPI",
    REACT_APP_GA_ID: '123',
    REACT_APP_STAGE: 'PRODUCTION',
    REACT_APP_GA_TEST: 'True'
  });
});

it('Should render production', () => {
  const props = {
    auth: {
      isSignedIn: false,
    },
    refreshSession: function () {}
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should render staging', () => {
  process.env = Object.assign(process.env, {
    REACT_APP_STAGE: 'STAGING'
  });

  const props = {
    auth: {
      isSignedIn: false,
    },
    refreshSession: function () {}
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should render logged in', () => {
  const props = {
    auth: {
      isSignedIn: true,
    },
    refreshSession: function () {}
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
