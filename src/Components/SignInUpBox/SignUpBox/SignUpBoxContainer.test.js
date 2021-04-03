import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import {
  HashRouter as Router
} from "react-router-dom";
import ReactGA from 'react-ga';

import * as Component from './SignUpBoxContainer'
import * as States from '../../../States'

import CanUseWebP from '../../../Functions/CheckIfWebpSupported'
jest.mock('../../../Functions/CheckIfWebpSupported')

// https://www.robinwieruch.de/react-connected-component-test

const mockStore = configureStore([]);

var component;

beforeEach(() => {
  CanUseWebP.mockReturnValue(true)
  ReactGA.initialize('dummy', { testMode: true });
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
    toggleVisibleForm: function() { },
    history: {
      push: mockHistoryPush,
    },
  };

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
