import React from 'react';
import { shallow } from 'enzyme';
import Component from './ProcoreDocumentSearchBox'
import * as States from '../../../../States'
import * as Endpoints from '../../../../Data/Endpoints'
import * as Strings from '../../../../Data/Strings'

var props;

beforeEach(() => {
  const mockUpdateSearchTerm = jest.fn()
  props = {
    updateSearchTerm: mockUpdateSearchTerm,
    procore: {
      searchTerm: ""
    }
  }
})

it('ProcoreDocumentSearchBox - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('ProcoreDocumentSearchBox - Should update search term', () => {
  const component = shallow(<Component {...props} />);
  const searchBox = component.find('input[id="search"]')
  searchBox.simulate('change', { target: { name: "search", value: 'abc' }});
  expect(props.updateSearchTerm).toHaveBeenCalledWith('abc')
  props.procore.searchTerm = "abc"
  component.setProps(props)
  expect(component).toMatchSnapshot();
});
