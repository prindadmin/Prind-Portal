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

import Component from './UserDetailsPopOverContainer'

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
      history: {},
      projectInvitations: [],
      signatureRequests: [],
      projectS3Token: {},
      userS3Token: {},
      currentRoute: Endpoints.DEFAULTLOGGEDINPAGE,
    },
    members: {
      currentMember: {
        accreditations: [
          {
            issuedDate: "2019-10-01T12:59:12.142216",
            revocationDate: "2019-11-01T12:59:12.142216",
            revocationReason: "expired",
            accreditationID: "constructionBasics",
            accreditationName: "Construction Basics 101",
            subject: "did:fnds:31a24b270fe86d9c595e715854028c319cc75957718861eb66996929eb5c8025",
            issuer: "did:fctr:d85be1f5baa83fa83850d8b58731a7f7c8ba65c33dec107c2e16e0dd65c7bcc7",
            status: "revoked"
          }
        ]
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

  const props = {
    memberDetails: {
      username: "aaaa-aaaa-aaaaaaaa-aaaa-aaaa"
    },
    onCancelPopup: jest.fn()
  };

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
