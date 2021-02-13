import React from 'react';
import { shallow } from 'enzyme';

import SideBar from './SideBar'

beforeEach(() => {
  process.env = Object.assign(process.env, {
    REACT_APP_PORTAL: 'CDM2015Project'
  });
});

it('Should render CDM project Sidebar', () => {
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
  const component = shallow(<SideBar {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should render DSHF project Sidebar', () => {
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
  const component = shallow(<SideBar {...props} />);
  expect(component).toMatchSnapshot();
});
