import React from 'react';
import { shallow } from 'enzyme';

import Component from './ProcoreBreadcrumbs'
import * as Endpoints from '../../Data/Endpoints'

var props;

beforeAll(() => {

})

beforeEach(() => {
  props = {
    history: {
      push: jest.fn(),
      location: {
        state: {}
      }
    },
    location: {
      pathname: "/documents"
    },
    procore: {
      folderHistory: {
        root: true,
        chain: []
      }
    }
  }
})

it('ProcoreBreadcrumbs - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

/*
it('ProcoreBreadcrumbs - Deep link should redirect to shallow link', () => {
  props.location.pathname = "/documents/12345"
  props.history.location.state = undefined
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('ProcoreBreadcrumbs - Render and click a crumb', () => {
  props.location.pathname = "/documents/12345"
  props.history.location.state = {
    "12345": "Test Folder"
  }
  const component = shallow(<Component {...props} />);
  component.find('#TestFolder').simulate('click', { id: "12345", name: "Test Folder" })
  expect(props.history.push).toHaveBeenCalledWith(`${Endpoints.PROJECTDOCUMENTSPAGE}/12345`, props.history.location.state )
  expect(component).toMatchSnapshot();
});

it('ProcoreBreadcrumbs - Render and click root crumb', () => {
  props.location.pathname = "/documents/12345"
  props.history.location.state = {
    "12345": "Test Folder"
  }
  const component = shallow(<Component {...props} />);
  component.find('#root').simulate('click')
  expect(props.history.push).toHaveBeenCalledWith(`${Endpoints.PROJECTDOCUMENTSPAGE}`, props.history.location.state )
  expect(component).toMatchSnapshot();
});
*/
