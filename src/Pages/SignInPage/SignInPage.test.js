import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';

import Component from './SignInPage'
import * as Endpoints from '../../Data/Endpoints'

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
});

it('Sign In Page - Should render sign in page', () => {
  const props = {
    location: {
      pathname: Endpoints.SIGNINPAGE,
      state: {}
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Sign In Page - Should render sign in page without state', () => {
  const props = {
    location: {
      pathname: Endpoints.SIGNINPAGE,
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Sign In Page - Should render sign in page without state then add state', () => {
  const props = {
    location: {
      pathname: Endpoints.SIGNINPAGE,
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  component.setProps({
    location: {
      pathname: Endpoints.SIGNINPAGE,
      state: {
        username: "aaaa-aaaa-aaaaaaaa-aaaa-aaaa"
      }
    }
  })
  expect(component).toMatchSnapshot();
});

it('Sign In Page - Should render sign in page without state then change page', () => {
  const props = {
    location: {
      pathname: Endpoints.SIGNINPAGE,
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  component.setProps({
    location: {
      pathname: Endpoints.SIGNUPPAGE,
    }
  })
  expect(component).toMatchSnapshot();
});

/*
// TODO: LOW PRIORITY: Test Can use webp
it('Sign In Page - Should render with webp', () => {
  const webP = jest.mock('../../Components/../Functions/CheckIfWebpSupported')

  webP.default.mockResolvedValue(true)

  const props = {
    location: {
      pathname: Endpoints.SIGNINPAGE,
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
*/
