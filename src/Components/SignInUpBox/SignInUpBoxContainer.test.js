import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import {
  HashRouter as Router
} from "react-router-dom";

import * as Component from './SignInUpBoxContainer'
import * as States from '../../States'

// https://www.robinwieruch.de/react-connected-component-test

const mockStore = configureStore([]);

var component;

beforeEach(() => {
  const store = mockStore({
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
      currentRoute: '/profile',
      details: {},
    }
  });

  const mockHistoryPush = jest.fn()
  const props = {
    isSignIn: true,
    isSignUp: false,
    isForgotPassword: false,
    isPasswordReset: false,
    username: "testing@buildingim.com",
    history: {
      push: mockHistoryPush
    },
    location: {
      pathname: '/signin'
    }
  };

  component = renderer.create(
    <Provider store={store}>
      <Router>
        <Component.default {...props} />
      </Router>
    </Provider>
  );
});


it('should render loading spinner with given state', () => {
  expect(component.toJSON()).toMatchSnapshot();
});
