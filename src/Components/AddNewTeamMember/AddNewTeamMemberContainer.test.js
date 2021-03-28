import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import { HashRouter as Router } from "react-router-dom";

import Component from './AddNewTeamMemberContainer'
import * as States from '../../States'
import * as Endpoints from '../../Data/Endpoints'
import * as Strings from '../../Data/Strings'

import * as members from '../../Reducers/members'

const mockStore = configureStore([]);

var component;
const mockDispatch = jest.fn()
var store

var mockOnSuccessAddingMember;
var mockOnCancelAddMember;

beforeEach(() => {
  const mockHistoryPush = jest.fn()

  mockOnSuccessAddingMember = jest.fn(() => { return; });
  mockOnCancelAddMember = jest.fn(() => { return; });

  store = mockStore({
    auth: {
      info: {},
      error: {},
      isSignedIn: States.AUTH_UNKNOWN,
      isConfirmed: States.AUTH_UNKNOWN,
      hasSignedUp: States.AUTH_UNKNOWN,
      hasSentCode: States.AUTH_UNKNOWN,
      hasChangedPassword: States.AUTH_UNKNOWN,
      passwordResetRequired: States.AUTH_UNKNOWN
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
    projects: {
      accessibleProjects: {
        projectCreator: [],
        projectRole: []
      },
      chosenProject: {
        projectName: Strings.NO_PROJECT_SELECTED,
        projectId: "123",
        projectType: "",
      },
      memberList: [],
      downloadURL: "",
      fileDetails: {},
      fetching: false,
      error: null,
    },
    members: {
      fetching: false,
      currentMember: {
        username: null,
        accreditations: []
      },
      roles: [
        {
          roleId: "1",
          roleName: "developer"
        },
        {
          roleId: "2",
          roleName: "principal contractor"
        }
      ],
    }
  });

  store.dispatch = mockDispatch

  const props = {
    history: {
      push: mockHistoryPush,
    },
    onSuccessAddingMember: mockOnSuccessAddingMember,
    onCancelAddMember: mockOnCancelAddMember,
  };

  component = renderer.create(
    <Provider store={store}>
      <Router>
        <Component {...props} />
      </Router>
    </Provider>
  );
});


it('should render', () => {
  expect(component.toJSON()).toMatchSnapshot();
});

// TODO: Fix this test
/*
it('should call dispatcher for addMember', () => {
  const expectedMemberValues = {
    roleId: "1",
    emailAddress: 'hootsuite@prind.tech'
  }

  const instanceComponent = component.getInstance()

  const username = instanceComponent.find('#emailAddress')
  const button = instanceComponent.find('#submit')
  username.simulate('change', { target: { name: "emailAddress", value: 'hootsuite@prind.tech' }});
  expect(instanceComponent.state('emailAddress')).toEqual("hootsuite@prind.tech")
  button.simulate('click')
  expect(store.dispatch).toHaveBeenCalledWith(members.addMemberToProject("123", expectedMemberValues, expect.any(Function), expect.any(Function)))
});
*/
