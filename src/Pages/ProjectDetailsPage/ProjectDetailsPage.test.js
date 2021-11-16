import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';

import * as Strings from '../../Data/Strings'

import Component from './ProjectDetailsPage'

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
  global.open = jest.fn()
});

it('New Project Page - Should render', () => {
  const props = {
    projects: {
      chosenProject: {
        projectName: Strings.NO_PROJECT_SELECTED
      }
    },
    location: {
      pathname: "/newproject"
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
