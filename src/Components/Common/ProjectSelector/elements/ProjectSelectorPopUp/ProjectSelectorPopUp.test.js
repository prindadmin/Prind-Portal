import React from 'react';
import { shallow } from 'enzyme';


import Component from './ProjectSelectorPopUp'

it('Should render', () => {
  const props = {
    projects: {
      accessibleProjects: {
        projectCreator: [
          {
            data:"1610470800",
            projectId:"CdmProject2021-01-12",
            projectName:"CDM Project",
            projectDescription: null,
            dateTime:"0000000000",
            projectType:"CDM2015Project",
          },
          {
            data:"1610386904",
            projectId:"TestFromForm3Dhsf2021-01-11",
            projectName:"Test from form 3 DHSF",
            projectDescription:"This is me testing if a DHSF project can be created",
            dateTime:"0000000000",
            projectType:"DHSFProject",
          }
        ],
        projectRole: []
      },
      chosenProject: {
        projectId: '1234',
        projectType: "CDM2015Project"
      }
    },
    onCancelPopup: function() {},
    getAccessibleProjects: function() {},
    updateChosenProject: function() {},
    location: {
      pathname: "/occupation/TestFromForm3Dhsf2021-01-11"
    },
    history: {
      push: function() {},
    },
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


// TODO: Currently has spinner; needs to respond to project request (getAccessibleProjects)
// TODO: Give this function a project list to render
it('Should render with two projects from creator', () => {
  const fetchProjectListFunc = jest.fn((projectId, resolve, reject) => {
    console.log(projectId)
    console.log(resolve)
    console.log(reject)
    resolve()
  });

  /*
  const fetchProjectListFunc = function(projectId, resolve, reject) {
    resolve()
  }
  */

  const props = {
    projects: {
      accessibleProjects: {
        projectCreator: [
          {
            data:"1610470800",
            projectId:"CdmProject2021-01-12",
            projectName:"CDM Project",
            projectDescription: null,
            dateTime:"0000000000",
            projectType:"CDM2015Project",
          },
          {
            data:"1610386904",
            projectId:"TestFromForm3Dhsf2021-01-11",
            projectName:"Test from form 3 DHSF",
            projectDescription:"This is me testing if a DHSF project can be created",
            dateTime:"0000000000",
            projectType:"DHSFProject",
          }
        ],
        projectRole: []
      },
      chosenProject: {
        projectId: '1234',
        projectType: "CDM2015Project"
      }
    },
    onCancelPopup: function() {},
    getAccessibleProjects: fetchProjectListFunc,
    updateChosenProject: function() {},
    location: {
      pathname: "/occupation/TestFromForm3Dhsf2021-01-11"
    },
    history: {
      push: function() {},
    },
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
