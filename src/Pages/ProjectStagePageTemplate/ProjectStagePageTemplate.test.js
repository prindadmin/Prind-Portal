import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactGA from 'react-ga';

import Component from './ProjectStagePageTemplate'
import * as Strings from "../../Data/Strings"
import * as ComponentState from './States'

var props;

var mockGetContent = jest.fn()
var mockRequestS3ProjectFileUploadToken = jest.fn()

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
  global.open = jest.fn()

  process.env = Object.assign(process.env, {
    REACT_APP_PORTAL: "CDM2015Project",
  });

});

beforeEach(() => {
  props = {
    location: {
      pathname: "/construction"
    },
    pageContent: {
      construction: {
        fields: [
          {
            fileDetails: [],
            editable: true,
            default: true,
            description: 'A construction phase plan is a document required under CDM. It is required on all construction projects and is used to plan and manage the construction works in a safe manner.',
            id: '1',
            title: 'Please upload your Construction Phase Plan (CPP)',
            type: 'file'
          },
          {
            fileDetails: [],
            editable: true,
            default: true,
            description: 'Meeting records should be uploaded for the project record to allow all parties to stay informed about progress on the project.',
            id: '2',
            title: 'Please upload your Monthly Progress report',
            type: 'file'
          }
        ]
      }
    },
    pageName: "construction",
    projectId: "",
    getContent: mockGetContent,
    requestS3ProjectFileUploadToken: mockRequestS3ProjectFileUploadToken
  }
})


it('Project Stage Template Page - Should render with no project', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  expect(mockGetContent).not.toHaveBeenCalled()
  expect(mockRequestS3ProjectFileUploadToken).not.toHaveBeenCalled()
});


it('Project Stage Template Page - Should render with a project', () => {
  props.projectId = "123"
  const resolvingGetContent = jest.fn((projectId, pageName, resolve, reject) => {
    resolve("success")
  });
  props.getContent = resolvingGetContent;
  const component = shallow(<Component {...props} />);
  expect(resolvingGetContent).toHaveBeenCalledWith("123", "construction", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("123", "construction")
  expect(component).toMatchSnapshot();
});


it('Project Stage Template Page - Should render with a project then change project', () => {
  props.projectId = "123"
  const resolvingGetContent = jest.fn((projectId, pageName, resolve, reject) => {
    resolve("success")
  });
  props.getContent = resolvingGetContent;
  const component = shallow(<Component {...props} />);
  expect(resolvingGetContent).toHaveBeenCalledWith("123", "construction", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("123", "construction")
  expect(component).toMatchSnapshot();
  component.setProps({
    projectId: "456"
  })
  expect(resolvingGetContent).toHaveBeenCalledWith("456", "construction", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("456", "construction")
  expect(component).toMatchSnapshot();
});


it('Project Stage Template Page - Should render with a project then change stage', () => {
  props.projectId = "123"
  const resolvingGetContent = jest.fn((projectId, pageName, resolve, reject) => {
    resolve("success")
  });
  props.getContent = resolvingGetContent;
  const component = shallow(<Component {...props} />);
  expect(resolvingGetContent).toHaveBeenCalledWith("123", "construction", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("123", "construction")
  expect(component).toMatchSnapshot();
  component.setProps({
    pageName: "design",
    pageContent: {
      design: {
        fields: [
          {
            fileDetails: [],
            editable: true,
            default: true,
            description: 'This document is required before any design work can start.',
            id: '1',
            title: 'Please Upload your Design Risk Assessment (DRA)',
            type: 'file'
          }
        ]
      }
    }
  })
  expect(resolvingGetContent).toHaveBeenCalledWith("123", "design", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("123", "design")
  expect(component).toMatchSnapshot();
});


it('Project Stage Template Page - Should render with a project then change project to no project', () => {
  props.projectId = "123"
  const resolvingGetContent = jest.fn((projectId, pageName, resolve, reject) => {
    resolve("success")
  });
  props.getContent = resolvingGetContent;
  const component = shallow(<Component {...props} />);
  expect(resolvingGetContent).toHaveBeenCalledTimes(1)
  expect(resolvingGetContent).toHaveBeenCalledWith("123", "construction", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledTimes(1)
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("123", "construction")
  expect(component).toMatchSnapshot();
  component.setProps({
    projectId: ""
  })
  expect(resolvingGetContent).toHaveBeenCalledTimes(1)
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledTimes(1)
  expect(component.state('state')).toEqual(ComponentState.CONTENT_NO_PROJECT_SELECTED)
  expect(component).toMatchSnapshot();
});


it('Project Stage Template Page - Should show error fetching page content', () => {
  props.projectId = "123"
  const resolvingGetContent = jest.fn((projectId, pageName, resolve, reject) => {
    reject({
      Error: {
        ErrorMessage: "Failed"
      }
    })
  });
  props.getContent = resolvingGetContent;
  const component = shallow(<Component {...props} />);
  expect(resolvingGetContent).toHaveBeenCalledWith("123", "construction", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("123", "construction")
  expect(component.state('state')).toEqual(ComponentState.CONTENT_FETCH_FAILED)
  expect(component).toMatchSnapshot();
});


it('Project Stage Template Page - Should render and click create field button', () => {
  props.projectId = "123"
  const resolvingGetContent = jest.fn((projectId, pageName, resolve, reject) => {
    resolve("success")
  });
  props.getContent = resolvingGetContent;
  const component = shallow(<Component {...props} />);
  expect(resolvingGetContent).toHaveBeenCalledWith("123", "construction", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("123", "construction")
  expect(component.state('createFieldIsOpen')).toEqual(false)
  const createButton = component.find('#create-field-button')
  createButton.simulate('click')
  expect(component.state('createFieldIsOpen')).toEqual(true)
  expect(component).toMatchSnapshot();
});


it('Project Stage Template Page - Should render and click create field button then close custom field', () => {
  props.projectId = "123"
  const resolvingGetContent = jest.fn((projectId, pageName, resolve, reject) => {
    resolve("success")
  });
  props.getContent = resolvingGetContent;
  const component = shallow(<Component {...props} />);
  expect(resolvingGetContent).toHaveBeenCalledWith("123", "construction", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("123", "construction")
  expect(component.state('createFieldIsOpen')).toEqual(false)
  const createButton = component.find('#create-field-button')
  createButton.simulate('click')
  expect(component.state('createFieldIsOpen')).toEqual(true)
  expect(component).toMatchSnapshot();
  const instance = component.instance();
  instance.onClosePopup()
  expect(component.state('createFieldIsOpen')).toEqual(false)
  expect(component).toMatchSnapshot();
});


it('Project Stage Template Page - Should render with a project but no fields', () => {
  props.projectId = "123"
  props.pageContent.construction.fields = []
  const resolvingGetContent = jest.fn((projectId, pageName, resolve, reject) => {
    resolve("success")
  });
  props.getContent = resolvingGetContent;
  const component = shallow(<Component {...props} />);
  expect(resolvingGetContent).toHaveBeenCalledWith("123", "construction", expect.any(Function), expect.any(Function))
  expect(mockRequestS3ProjectFileUploadToken).toHaveBeenCalledWith("123", "construction")
  expect(component).toMatchSnapshot();
}); 
