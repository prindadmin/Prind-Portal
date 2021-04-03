import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import ReactGA from 'react-ga';
import { HashRouter as Router } from "react-router-dom";

import * as States from '../../States'
import Component from './SignInPageContainer'

import CanUseWebP from '../../Functions/CheckIfWebpSupported'
jest.mock('../../Functions/CheckIfWebpSupported')

const mockStore = configureStore([]);
var component;

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
});

beforeEach(() => {
  CanUseWebP.mockReturnValue(false)
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
  const props = {};

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


it('should render with WebP', () => {
  CanUseWebP.mockReturnValue(true)
  expect(component).toMatchSnapshot();
});
