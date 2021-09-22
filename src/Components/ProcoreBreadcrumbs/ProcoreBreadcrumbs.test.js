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
        chain: []
      }
    },
    updateCurrentFolder: jest.fn(),
    updateFolderHistory: jest.fn()
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
  expect(props.history.push).toHaveBeenCalledWith(Endpoints.PROJECTDOCUMENTSPAGE)
});
*/

it('ProcoreBreadcrumbs - Render and click a crumb', () => {
  props.location.pathname = "/documents/12345"
  props.procore.folderHistory = {
    "12345": "Test Folder"
  }
  props.procore.folderHistory.chain = ["12345"]
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
  component.find("div[id='TestFolder']").simulate('click', { id: "12345", name: "Test Folder" })
  expect(props.updateCurrentFolder).toHaveBeenCalledWith("12345")
  expect(props.updateFolderHistory).toHaveBeenCalledWith({
    12345: "Test Folder",
    chain:["12345"] }
  )
  expect(component).toMatchSnapshot();
});

it('ProcoreBreadcrumbs - Render and click root crumb', () => {
  props.location.pathname = "/documents/12345"
  props.procore.folderHistory = {
    "12345": "Test Folder"
  }
  props.procore.folderHistory.chain = ["12345"]
  const component = shallow(<Component {...props} />);
  component.find('#root').simulate('click')
  expect(props.updateCurrentFolder).toHaveBeenCalledWith();
  expect(props.updateFolderHistory).toHaveBeenCalledWith({
    12345: "Test Folder",
    chain: []
  })
  expect(component).toMatchSnapshot();
});
