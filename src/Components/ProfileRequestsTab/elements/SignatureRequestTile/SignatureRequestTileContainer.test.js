import { Suspense } from 'react'
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import ReactGA from 'react-ga';
import { HashRouter as Router } from "react-router-dom";

import Component from './SignatureRequestTileContainer'
import * as Endpoints from '../../../../Data/Endpoints'
import * as Strings from '../../../../Data/Strings'
import * as States from '../../../../States'

const mockStore = configureStore([]);
var component;

var props;

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
  global.open = jest.fn()

  process.env = Object.assign(process.env, {
    REACT_APP_PORTAL: 'CDM2015Project',
  });
});

beforeEach(() => {
  props = {
    requestDetails: {
      requestedAt: "2021-03-29T06:53:31",
      projectID: "123",
      pageName: "design",
      fieldID: "2",
      projectName: "Test Project 1",
      fieldTitle: "Field title 1",
      filename: "filename.txt",
      requestedBy: {
        username: "aaaa-aaaa-aaaaaaaa-aaaa-aaaa-aaaa",
        firstName: "Testy",
        lastName: "McTesterson",
      }
    }
  }
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
    }
  });

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
