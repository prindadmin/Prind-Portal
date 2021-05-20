//import { Suspense } from 'react';
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import ReactGA from 'react-ga';
import { HashRouter as Router } from "react-router-dom";
import * as States from '../../States'
import * as Strings from '../../Data/Strings'
import * as Endpoints from '../../Data/Endpoints'

import Component from './ConfirmEmailPageContainer'

const mockStore = configureStore([]);
var component;

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
});

beforeEach(() => {
  const store = mockStore({});

  const props = {
    location: {
      search: "?user_name=1234567890&confirmation_code=abcdef",
      pathname: '/confirm-email'
    },
    history: {
      push: jest.fn()
    }
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
