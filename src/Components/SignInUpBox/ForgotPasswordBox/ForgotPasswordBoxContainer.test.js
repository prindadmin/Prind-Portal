import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import {
  HashRouter as Router
} from "react-router-dom";

import * as Component from './ForgotPasswordBoxContainer'
//import * as States from '../../../States'

// https://www.robinwieruch.de/react-connected-component-test

const mockStore = configureStore([]);

var component;

beforeEach(() => {
  const store = mockStore({});

  const mockToggleVisibleForm = jest.fn()
  const mockResetPassword = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    resetPassword: mockResetPassword,
  }

  component = renderer.create(
    <Provider store={store}>
      <Router>
        <Component.default {...props} />
      </Router>
    </Provider>
  );
});


it('should render with given state', () => {
  expect(component.toJSON()).toMatchSnapshot();
});
