import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';

import Component from './LoggedInContent'

var props;
const mockGetProjectDetails = jest.fn()
const mockSaveProjectID = jest.fn()
const mockGetProjectMembers = jest.fn()

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
  global.open = jest.fn()

  process.env = Object.assign(process.env, {
    REACT_APP_PORTAL: 'CDM2015Project',
  });
});

beforeEach(() => {
  props = {
    location: {
      pathname: "/inception",
      state: {}
    },
    projects: {
      chosenProject: {}
    },
    procore: {
      companyId: "TestCompanyId",
      projectId: "TestProjectId"
    },
    user: {
      details: {}
    },
    getProjectDetails: mockGetProjectDetails,
    saveProjectID: mockSaveProjectID,
    getProjectMembers: mockGetProjectMembers,
    resetSite: jest.fn(),
    checkServerAccessToProcore: jest.fn()
  }
});


it('LoggedInContent Page - Should render no project selected', () => {
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should initial load with direct link to project', () => {
  props.location.pathname = "/inception/123"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).toHaveBeenCalledWith({ projectId: "123" })
  expect(mockSaveProjectID).toHaveBeenCalledWith("123")
  expect(mockGetProjectMembers).toHaveBeenCalledWith("123")

  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should initial load with direct link to project and ending slash', () => {
  props.location.pathname = "/inception/123/"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).toHaveBeenCalledWith({ projectId: "123" })
  expect(mockSaveProjectID).toHaveBeenCalledWith("123")
  expect(mockGetProjectMembers).toHaveBeenCalledWith("123")

  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should initial load with direct link to profile page', () => {
  props.location.pathname = "/profile"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()

  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should load then unmount', () => {
  const mockWindowRemoveListener = jest.fn()
  window.removeEventListener = mockWindowRemoveListener

  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()

  component.instance().componentWillUnmount()
  expect(mockWindowRemoveListener).toHaveBeenCalled();
});


it('LoggedInContent Page - Should render then have an error fetching a project', () => {
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  component.setProps({
    projects: {
      chosenProject: {},
      error: "There was an error"
    }
  })
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should initial load with direct link to project then update project', () => {
  props.location.pathname = "/inception/123"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).toHaveBeenCalledWith({ projectId: "123" })
  expect(mockSaveProjectID).toHaveBeenCalledWith("123")
  expect(mockGetProjectMembers).toHaveBeenCalledWith("123")
  // Update props to another project
  component.setProps({
    location: {
      pathname: "/inception/456",
      state: {}
    }
  })
  expect(mockGetProjectDetails).toHaveBeenCalledWith({ projectId: "456" })
  expect(mockSaveProjectID).toHaveBeenCalledWith("456")
  expect(mockGetProjectMembers).toHaveBeenCalledWith("456")
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should initial load with direct link to project then update page', () => {
  props.location.pathname = "/inception/123"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).toHaveBeenCalledWith({ projectId: "123" })
  expect(mockSaveProjectID).toHaveBeenCalledWith("123")
  expect(mockGetProjectMembers).toHaveBeenCalledWith("123")
  // Respond to saveProjectID
  component.setProps({
    projects: {
      chosenProject: {
        projectId: "123"
      }
    }
  })
  // Change page
  component.setProps({
    location: {
      pathname: "/inception/123"
    }
  })
  expect(component).toMatchSnapshot()
});


it('LoggedInContent Page - Should render team page', () => {
  props.location.pathname = "/team"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should render project page', () => {
  props.location.pathname = "/project"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should render foundations page', () => {
  props.location.pathname = "/foundations"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should render newproject page', () => {
  props.location.pathname = "/newproject"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should render profile page', () => {
  props.location.pathname = "/profile"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should render 404 for non-existent page', () => {
  props.location.pathname = "/carrot"
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should render no project selected at mobile resolution', () => {
  window.innerWidth = 800;
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('LoggedInContent Page - Should render no project selected at mobile resolution with error', () => {
  window.innerWidth = 800;
  const component = shallow(<Component {...props} />);
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  component.setProps({
    projects: {
      chosenProject: {},
      error: "There was an error"
    }
  })
  expect(mockGetProjectDetails).not.toHaveBeenCalled()
  expect(mockSaveProjectID).not.toHaveBeenCalled()
  expect(mockGetProjectMembers).not.toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});
