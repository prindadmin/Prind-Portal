import React from 'react';
import { shallow } from 'enzyme';

import SideBarMobile from './SideBarMobile'

beforeEach(() => {
  process.env = Object.assign(process.env, {
    REACT_APP_PORTAL: 'CDM2015Project'
  });
});

it('Should render CDM project Sidebar', () => {
  process.env = Object.assign(process.env, {
    REACT_APP_PORTAL: 'CDM2015Project'
  });
  const props = {
    projects: {
      chosenProject: {
        projectId: '1234',
        projectType: "CDM2015Project"
      }
    },
    location: {
      pathname: "/occupation/TestFromForm3Dhsf2021-01-11"
    }
  };
  const component = shallow(<SideBarMobile {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should render DSHF project Sidebar', () => {
  process.env = Object.assign(process.env, {
    REACT_APP_PORTAL: 'DHSFProject'
  });
  const props = {
    projects: {
      chosenProject: {
        projectId: '1234',
        projectType: "DHSFProject"
      }
    },
    location: {
      pathname: "/occupation/TestFromForm3Dhsf2021-01-11"
    }
  };
  const component = shallow(<SideBarMobile {...props} />);
  expect(component).toMatchSnapshot();
});
