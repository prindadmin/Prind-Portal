//import { Suspense } from 'react';
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import ReactGA from 'react-ga';
import { HashRouter as Router } from "react-router-dom";
import * as States from '../../States'
import * as Strings from '../../Data/Strings'
import * as Endpoints from '../../Data/Endpoints'

import Component from './ContactTileContainer'

const mockStore = configureStore([]);
var component;

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
});

beforeEach(() => {
  const store = mockStore({
    user: {
      username: "aaaa-aaaaaaaa-aaaa-aaaa-aaaa"
    },
    projects: {
      accessibleProjects: {
        projectCreator: [],
        projectRole: []
      },
      chosenProject: {
        projectName: "Test Project 1",
        projectId: "TestProjectID",
        projectType: "CDM2015",
      },
      memberList: {
        confirmed: [
          {
            username: "aaaa-aaaaaaaa-aaaa-aaaa-aaaa",
            roleID: 'creator',
          }
        ]
      },
      downloadURL: "",
      fileDetails: {},
      fetching: false,
      error: null,
    },
  });

  const props = {
    memberDetails: {
      username: "aaaa-aaaaaaaa-aaaa-aaaa-aaaa",
      emailAddress: "testy.mctesterson@prind.tech",
      firstName: "Testy",
      lastName: "McTesterson",
    },
    onMemberRemove: jest.fn(),
    removeMember: jest.fn(),
    confirmed: false
  };

  component = mount(
    <Provider store={store}>
      <Router>
        <Component {...props} />
      </Router>
    </Provider>
  );
});


it('should render', () => {
  expect(component).toMatchSnapshot();
});
