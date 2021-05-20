import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import CanUseWebP from '../../../Functions/CheckIfWebpSupported'
jest.mock('../../../Functions/CheckIfWebpSupported')

import {
  HashRouter as Router
} from "react-router-dom";
import ReactGA from 'react-ga';

import * as Component from './ResetPasswordContainer'
import * as States from '../../../States'

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
    }
  });

  const mockToggleVisibleForm = jest.fn()
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: mockToggleVisibleForm,
    history: {
      push: mockHistoryPush,
    },
    location: {
      search: "client_id=fbss4knsc8gmgct526ci8kp3a&user_name=892107a6-b223-4774-8dff-0b6fe5414ffe&confirmation_code=587828",
      pathname: "reset-password?",
    }
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
