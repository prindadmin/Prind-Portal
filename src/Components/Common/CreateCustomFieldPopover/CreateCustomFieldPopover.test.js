import React from 'react';
import { shallow, mount } from 'enzyme';

import Component from './CreateCustomFieldPopover'

it('Should render', () => {
  const props = {
    projectId: "123",
    pageName: "occupation",
    onClosePopover: function() {},
    createField: function() {}
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should populate title and description fields and create field sucessfully', () => {
  const mockCreateField = jest.fn((projectID, pageName, fieldDetails, resolve, reject) => {
    resolve()
  });

  const props = {
    projectId: "123",
    pageName: "occupation",
    onClosePopover: function() {},
    createField: mockCreateField
  };
  const component = shallow(<Component {...props} />);

  const title = component.find('#title')
  title.simulate('change', { target: { value: 'test title' }});
  const description = component.find('#description')
  description.simulate('change', { target: { value: 'test description' }});
  component.find('#submit').simulate('click', { preventDefault: () => {}} )

  expect(mockCreateField).toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('Should create a dropdown field and create field sucessfully', () => {
  const mockCreateField = jest.fn((projectID, pageName, fieldDetails, resolve, reject) => {
    resolve()
  });

  const props = {
    projectId: "123",
    pageName: "occupation",
    onClosePopover: function() {},
    createField: mockCreateField
  };
  const component = shallow(<Component {...props} />);

  const title = component.find('#title')
  title.simulate('change', { target: { value: 'test title' }});
  const description = component.find('#description')
  description.simulate('change', { target: { value: 'test description' }});
  component.find('input[value="dropdown"]').simulate('change', {target: {name: 'type', value: 'dropdown'}})
  component.find('#fieldDropDownOptions').simulate('change', { target: { name: 'fieldDropDownOptions', value: 'Option 1, Option 2' }});


  component.find('#submit').simulate('click', { preventDefault: () => {}} )

  expect(mockCreateField).toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('Should populate title and description fields and create field fails', () => {
  const mockCreateField = jest.fn((projectID, pageName, fieldDetails, resolve, reject) => {
    reject()
  });

  const props = {
    projectId: "123",
    pageName: "occupation",
    onClosePopover: function() {},
    createField: mockCreateField
  };
  const component = shallow(<Component {...props} />);

  const title = component.find('#title')
  title.simulate('change', { target: { value: 'test title' }});
  const description = component.find('#description')
  description.simulate('change', { target: { value: 'test description' }});
  component.find('#submit').simulate('click', { preventDefault: () => {}} )

  expect(mockCreateField).toHaveBeenCalled()
  expect(component).toMatchSnapshot();
});


it('Should close popover', () => {
  const mockCreateField = jest.fn()
  const mockOnClosePopover = jest.fn()
  const props = {
    projectId: "123",
    pageName: "occupation",
    onClosePopover: mockOnClosePopover,
    createField: mockCreateField
  };
  const component = shallow(<Component {...props} />);
  component.find('#popup-greyer').simulate('click', { stopPropagation: () => {}} )
  expect(mockOnClosePopover).toHaveBeenCalled()
});


it('Should close popover 2', () => {
  const mockCreateField = jest.fn()
  const mockOnClosePopover = jest.fn()
  const props = {
    projectId: "123",
    pageName: "occupation",
    onClosePopover: mockOnClosePopover,
    createField: mockCreateField
  };
  const component = shallow(<Component {...props} />);
  component.find('#create-custom-field-popover-container').simulate('click', { stopPropagation: () => {}} )
  expect(mockOnClosePopover).not.toHaveBeenCalled()
});


it('Should select each type of field', () => {
  const props = {
    projectId: "123",
    pageName: "occupation",
    onClosePopover: function() {},
    createField: function() {},
  };
  const component = shallow(<Component {...props} />);
  component.find('input[value="file"]').simulate('change', {target: {name: 'type', value: 'file'}})
  expect(component).toMatchSnapshot();
  component.find('input[value="calendar"]').simulate('change', {target: {name: 'type', value: 'calendar'}})
  expect(component).toMatchSnapshot();
  component.find('input[value="dropdown"]').simulate('change', {target: {name: 'type', value: 'dropdown'}})
  expect(component).toMatchSnapshot();
  component.find('input[value="longText"]').simulate('change', {target: {name: 'type', value: 'longText'}})
  expect(component).toMatchSnapshot();
});
