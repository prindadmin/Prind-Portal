import { Suspense } from 'react';
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import ReactGA from 'react-ga';
import { HashRouter as Router } from "react-router-dom";
import * as States from '../../States'
import * as Strings from '../../Data/Strings'
import * as Endpoints from '../../Data/Endpoints'

import Component from './ProfileHistoryTabContainer'

const mockStore = configureStore([]);
var component;

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
});

beforeEach(() => {
  const store = mockStore({
    auth: {
      isSignedIn: States.AUTH_UNKNOWN,
      isConfirmed: States.AUTH_UNKNOWN,
      hasSignedUp: States.AUTH_UNKNOWN,
      hasSentCode: States.AUTH_UNKNOWN,
      hasChangedPassword: States.AUTH_UNKNOWN,
      passwordResetRequired: States.AUTH_UNKNOWN
    },
    projects: {
      accessibleProjects: {
        projectCreator: [],
        projectRole: []
      },
      chosenProject: {
        projectName: Strings.NO_PROJECT_SELECTED,
        projectId: "",
        projectType: "",
      },
      memberList: [],
      downloadURL: "",
      fileDetails: {},
      fetching: false,
      error: null,
    },
    foundations: {
      fetching: false,
    },
    user: {
      fetching: false,
      details: {},
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
      },
      projectInvitations: [],
      signatureRequests: [],
      projectS3Token: {},
      userS3Token: {},
      currentRoute: Endpoints.DEFAULTLOGGEDINPAGE,
    },
    members: {
      currentMember: {
        accreditations: []
      }
    },
    pageContent: {
      inception: {
        fetching: false,
        fields: [],
        error: null,
      },
      feasibility: {
        fetching: false,
        fields: [],
        error: null,
      },
      design: {
        fetching: false,
        fields: [],
        error: null,
      },
      tender: {
        fetching: false,
        fields: [],
        error: null,
      },
      construction: {
        fetching: false,
        fields: [],
        error: null,
      },
      handover: {
        fetching: false,
        fields: [],
        error: null,
      },
      occupation: {
        fetching: false,
        fields: [],
        error: null,
      },
      refurbishment: {
        fetching: false,
        fields: [],
        error: null,
      },
    }
  });

  const props = {};

  component = mount(
    <Suspense fallback={<p>error</p>}>
      <Provider store={store}>
        <Router>
          <Component {...props} />
        </Router>
      </Provider>
    </Suspense>
  );
});


it('should render', () => {
  expect(component).toMatchSnapshot();
});
