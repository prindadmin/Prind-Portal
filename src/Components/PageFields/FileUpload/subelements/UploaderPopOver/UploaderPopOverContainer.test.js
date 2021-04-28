//import { Suspense } from 'react';
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { HashRouter as Router } from "react-router-dom";

import Component from './UploaderPopOverContainer'

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

    jest.mock("aws-sdk", () => {
      return {
        config: {
          update: mockConfigUpdate
        },
        S3: jest.fn(() => ({
          putObject: mockS3PutObject
        }))
      };
    });
});

beforeEach(() => {
  store = mockStore({
    user: {
      username: "aaaa-aaaaaaaa-aaaa-aaaa-aaaa",
      details: {
        foundationsID: "1234"
      },
      projectS3Token: {
        AccessKeyId: "TokenAccessKeyId",
        SecretAccessKey: "TokenSecretAccessKey",
        SessionToken: "TokenSessionToken"
      }
    }
  });

  const props = {
    fileDetails: {
      files: [
        {
          name: "hello.csv",
          type: 'text.csv',
          size: 100,
          value: "C:\\fakepath\\hello.csv"
        }
      ]
    },
    projectID: "123",
    pageName: "design",
    fieldID: 1,
    fieldType: "file",
    onCancelPopup: jest.fn(),
  };

  component = mount(
    <Provider store={store}>
      <Router>
        <Component {...props} />
      </Router>
    </Provider>
  );
});


it('UploaderPopOverContainer - should render', () => {
  expect(component).toMatchSnapshot();
});

// TODO: FUTURE: Write test for when upload is successful
