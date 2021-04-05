
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { HashRouter as Router } from "react-router-dom";

import Component from './CreatingProjectPopoverContainer'

const mockStore = configureStore([]);
var component;

beforeAll(() => {
  document.body.innerHTML =
    '<div id="root">' +
    '</div>' +
    '<div id="popOver">' +
    '</div>';
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
