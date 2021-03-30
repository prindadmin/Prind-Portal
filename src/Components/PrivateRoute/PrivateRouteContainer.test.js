import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import {
  HashRouter as Router,
  Route,
} from "react-router-dom";

import * as Component from './PrivateRouteContainer'
import * as States from '../../States'

import SubComponent from '../Error404'

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

  const mockStoreRoute = jest.fn()
  const props = {
    auth: {
      isSignedIn: States.AUTH_UNKNOWN
    },
    path: '/documents',
    location: {
      pathname: '/documents'
    },
    user: {
      currentRoute: '/documents'
    },
    component: <SubComponent />,
    storeRoute: mockStoreRoute
  };

  component = mount(
    <Provider store={store}>
      <Router>
        <Component.default {...props} />
      </Router>
    </Provider>
  );
});


it('should render with given state from Redux store', () => {
  expect(component).toMatchSnapshot();
});
