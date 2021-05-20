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


it('Should render then change state based on props', () => {
  var props = {
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
  component.setProps({ openProjectSelector: true })
  expect(component).toMatchSnapshot();
});


it('Should render then trigger cancelPopup and change state', () => {
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

  component.instance().cancelPopup()
  expect(component.state('showPopup')).toEqual(false)
  expect(component).toMatchSnapshot();
});

it('Should render without a chosen project', () => {
  const props = {
    projects: {},
    openProjectSelector: false,
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
