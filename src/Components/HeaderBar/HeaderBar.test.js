import React from 'react';
import { shallow } from 'enzyme';

import Component from './HeaderBar'


it('Should render without project and without project selector', () => {
  const props = {
    projects: undefined,
    getUserDetails: function() {},
    openProjectSelector: false,
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should render with project and without project selector', () => {
  const props = {
    projects: {
      chosenProject: {
        projectId: '1234',
        projectType: "CDM2015Project"
      }
    },
    getUserDetails: function() {},
    openProjectSelector: false,
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should render with project and with project selector', () => {
  const props = {
    projects: {
      chosenProject: {
        projectId: '1234',
        projectType: "CDM2015Project"
      }
    },
    getUserDetails: function() {},
    openProjectSelector: true,
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
