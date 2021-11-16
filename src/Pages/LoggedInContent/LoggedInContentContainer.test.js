import { Suspense } from 'react'
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import ReactGA from 'react-ga';
import { HashRouter as Router } from "react-router-dom";

import Component from './LoggedInContentContainer'
import * as Endpoints from '../../Data/Endpoints'
import * as Strings from '../../Data/Strings'
import * as States from '../../States'

const mockStore = configureStore([]);
var component;

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
  document.body.innerHTML =
    '<div id="root">' +
    '</div>' +
    '<div id="popOver">' +
    '</div>';
});

beforeEach(() => {
  props = {}
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
      history: {},
      projectInvitations: [],
      signatureRequests: [],
      projectS3Token: {},
      userS3Token: {},
      currentRoute: Endpoints.DEFAULTLOGGEDINPAGE,
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
    },
    procore: {
      companyId: "",
      projectId: ""
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
