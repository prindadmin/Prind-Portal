import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';

import Component from './ProjectDetailsPage'

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
  global.open = jest.fn()
});

it('New Project Page - Should render', () => {
  const props = {
    projects: {
      chosenProject: {
        projectId: "TestId",
        projectType: "Test Type",
        projectName: "Test Name",
        projectDescription: "Test Description",
        projectReference: "Test Reference",
        projectAddressLine1: "Test Address Line 1",
        projectAddressLine2: "Test Address Line 2",
        projectAddressLine3: "Test Address Line 3",
        projectAddressTown: "Test Address Town",
        projectAddressRegion: "Test Address Region",
        projectAddressPostalCode: "Test Address Postal Code",
        projectAddressCountry: "Test Address Country",
      }
    },
    location: {
      pathname: "/newproject"
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
