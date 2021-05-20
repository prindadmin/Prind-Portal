import React from 'react';
import { shallow } from 'enzyme';

import Component from './ProfileHistoryTab'

var props;

beforeEach(() => {
  props = {
    user: {
      history: {
        documentVersions: [
          {
            type: "DOCUMENT_UPLOADED",
            projectName: "Test Project 123",
            dateTime: "2020-03-09T16:56:36.217421"
          }
        ],
        projects: {
          projectCreator: [
            {
              type: "PROJECT_CREATED",
              projectName: "Test Project 123",
              dateTime: "2020-03-10T16:56:36.217421"
            }
          ],
          projectRole: [
            {
              type: "PROJECT_JOINED",
              projectName: "Test Project 123",
              dateTime: "2020-03-11T16:56:36.217421"
            }
          ]
        },
        signedDocuments: [
          {
            type: "DOCUMENT_SIGNED",
            filename: "Test File 1.txt",
            projectName: "Test Project 123",
            signedAt: "2020-03-12T16:56:36.217421"
          }
        ]
      }
    }
  }
});


it('Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render with different date time supplied to document versions', () => {
  props.user.history.documentVersions[0].signedAt = "2020-03-09T16:56:36.217421"
  delete props.user.history.documentVersions[0].dateTime

  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render with different date time supplied to signed documents', () => {
  props.user.history.signedDocuments[0].dateTime = "2020-03-12T16:56:36.217421"
  delete props.user.history.documentVersions[0].signedAt

  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render with no history elements', () => {
  props.user.history.documentVersions = []
  props.user.history.projects = {
    projectCreator: [],
    projectRole: []
  }
  props.user.history.signedDocuments = []

  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render with no history at all', () => {
  props.user.history = {}
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
