import { Provider, dispatch } from 'react-redux'
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import {
  BrowserRouter as Router
} from "react-router-dom";
import ReactGA from 'react-ga';

import * as Component from './ProcoreDocumentSearchBoxContainer'
import * as States from '../../States'
import * as procoreReducer from '../../Reducers/procore'

// https://www.robinwieruch.de/react-connected-component-test

const mockStore = configureStore([]);

var component;
const mockDispatch = jest.fn()

beforeEach(() => {
  const store = mockStore({
    procore: {
      fetching: false,
      companyId: "28592",
      companyName: "",
      projectId: "1234",
      projectName: "",
      folders: [],
      files: [],
      error: {},
      searchTerm: ""
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


it('should render with given state', () => {
  expect(component).toMatchSnapshot();
});


it('should trigger function', () => {
  const searchBox = component.find('input[id="search"]')

  searchBox.simulate('change', { target: { name: "search", value: 'abc' }});

  expect(mockDispatch).toHaveBeenCalledWith(procoreReducer.updateSearchTerm('abc'))
});
