import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';

import Component from './ProjectTeamPage'
import * as Strings from '../../Data/Strings'

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
  global.open = jest.fn()
});

it('New Project Page - Should render with no project', () => {
  const mockGetCurrentMembers = jest.fn()
  const mockGetRoles = jest.fn()
  //const mockHandleSubmit = jest.fn()

  const props = {
    location: {
      pathname: "/newproject"
    },
    projects: {
      chosenProject: {
        projectName: Strings.NO_PROJECT_SELECTED,
        projectId: "",
        projectType: "",
      }
    },
    getCurrentMembers: mockGetCurrentMembers,
    getRoles: mockGetRoles,
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
