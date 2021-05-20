import React from 'react';
import { shallow } from 'enzyme';

import Component from './CreateCustomFieldPopoverContainer'

it('Should render', () => {
  const props = {}
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

/*
import { Provider, dispatch } from 'react-redux'
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import { HashRouter as Router } from "react-router-dom";

import * as Component from './CreateCustomFieldPopoverContainer'

// https://www.robinwieruch.de/react-connected-component-test
const mockStore = configureStore([]);

var component;
const mockOnClosePopover = jest.fn()
const mockDispatch = jest.fn()

beforeEach(() => {
  const store = mockStore({});

  store.dispatch = mockDispatch

  const props = {
    projectId: "Project1234",
    pageName: "Design",
    onClosePopover: mockOnClosePopover,
  };

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
*/
