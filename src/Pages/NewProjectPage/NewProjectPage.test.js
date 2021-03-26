import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';

import Component from './NewProjectPage'

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
  global.open = jest.fn()
});

it('New Project Page - Should render', () => {
  const props = {
    location: {
      pathname: "/newproject"
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
