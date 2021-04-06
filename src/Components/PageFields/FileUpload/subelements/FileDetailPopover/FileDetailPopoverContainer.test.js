//import { Suspense } from 'react';
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { HashRouter as Router } from "react-router-dom";

import Component from './FileDetailPopoverContainer'

const mockStore = configureStore([]);
var component;
var store;
var props;

beforeAll(() => {
  document.body.innerHTML =
    '<div id="root">' +
    '</div>' +
    '<div id="popOver">' +
    '</div>';
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
    chosenFileDetails: {
      uploadName: "File123.txt",
      uploadDateTime: "2021-04-06T07:06:23",
      uploadedBy: "Testy McTesterson",
      proofLink: "https://prind.tech",
      ver: "0",
      signatures: [
        {
          signerName: "Signer One",
          signatureDateTime: "2021-01-11T11:11:11",
          proofLink: "https://testnet.explorer.factom.pro/entries/93ae94fce1d960dc818c049f9a23f8305cdea54dd6954153c57be62179db1fcf",
        },
        {
          signerName: "Signer Two",
          signatureDateTime: "2021-02-22T22:22:22",
          proofLink: "https://testnet.explorer.factom.pro/entries/93ae94fce1d960dc818c049f9a23f8305cdea54dd6954153c57be62179db1fcf",
        }
      ]
    },
    pageName: "design",
    fieldID: "1",
    onClosePopover: jest.fn()
  };

  component = mount(
    <Provider store={store}>
      <Router>
        <Component {...props} />
      </Router>
    </Provider>
  );
});


it('FileDetailPopoverContainer - should render', () => {
  expect(component).toMatchSnapshot();
});

/*
it('FileDetailPopoverContainer - Click self-sign button', () => {
  component.find('#self-sign-button').simulate('click')
  expect(component).toMatchSnapshot();
});
*/
