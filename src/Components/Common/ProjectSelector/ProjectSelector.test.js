import React from 'react';
import { shallow } from 'enzyme';

import Component from './ProjectSelector'

it('Should render without project selector', () => {
  const props = {
    projects: {
      chosenProject: {
        projectId: '1234',
        projectType: "CDM2015Project"
      }
    },
    openProjectSelector: false,
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should render with project selector', () => {
  const props = {
    projects: {
      chosenProject: {
        projectId: '1234',
        projectType: "CDM2015Project"
      }
    },
    openProjectSelector: true,
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

// TODO: Work out how to find the button and click it
it('Should render without project selector and then open project selector', () => {
  const props = {
    projects: {
      chosenProject: {
        projectId: '1234',
        projectType: "CDM2015Project"
      }
    },
    openProjectSelector: false,
  };
  const component = shallow(<Component {...props} />);

  const projectButton = component.find('button[id="search-field"]')
  projectButton.simulate('click');

  expect(component).toMatchSnapshot();
});
