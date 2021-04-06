//import { Suspense } from 'react';
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { HashRouter as Router } from "react-router-dom";

import Component from './CurrentVersionContainer'
import * as foundations from '../../../../../Reducers/foundations'

const mockStore = configureStore([]);
var component;
var store;
var props;


beforeAll(() => {

});

beforeEach(() => {
  store = mockStore({
    user: {
      username: "aaaa-aaaaaaaa-aaaa-aaaa-aaaa",
      details: {
        foundationsID: "1234"
      }
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
      fetching: false,
      error: null,
    },
  });

  const props = {
    details: {
      uploadName: "File123.txt",
      uploadedDateTime: "2021-04-06T07:06:23",
      uploadedBy: "Testy McTesterson",
      proofLink: "https://prind.tech",
      ver: "0"
    },
    pageName: "design",
    fieldID: "1",
    editable: true,
  };

  component = mount(
    <Provider store={store}>
      <Router>
        <Component {...props} />
      </Router>
    </Provider>
  );
});


it('CurrentVersionContainer - should render', () => {
  expect(component).toMatchSnapshot();
});


it('CurrentVersionContainer - Click self-sign button', () => {
  component.find('#self-sign-button').simulate('click')
  expect(component).toMatchSnapshot();
});
