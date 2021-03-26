import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import ReactGA from 'react-ga';
import { HashRouter as Router } from "react-router-dom";

import Component from './FoundationsPageContainer'

const mockStore = configureStore([]);
var component;

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
});

beforeEach(() => {
  const store = mockStore({});
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
