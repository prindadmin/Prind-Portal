import { Provider, dispatch } from 'react-redux'
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import { HashRouter as Router } from "react-router-dom";

import * as Component from './NoFoundationsIDBannerContainer'

// https://www.robinwieruch.de/react-connected-component-test
const mockStore = configureStore([]);

var component;
const mockOnClosePopover = jest.fn()
const mockDispatch = jest.fn()

beforeEach(() => {
  const store = mockStore({
    user: {
      details: {
        foundationsID: "1234567890"
      }
    }
  });

  store.dispatch = mockDispatch

  const props = {};

  component = mount(
    <Provider store={store}>
      <Router>
        <Component.default {...props} />
      </Router>
    </Provider>
  );
});


it('Should render', () => {
  expect(component).toMatchSnapshot();
});
