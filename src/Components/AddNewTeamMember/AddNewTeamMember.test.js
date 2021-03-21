import React from 'react';
import { shallow, mount } from 'enzyme';

import Component from './AddNewTeamMember'

var props;
var mockOnSuccessAddingMember;
var mockOnCancelAddMember;
var mockAddMember;

beforeEach(() => {
  mockOnSuccessAddingMember = jest.fn(() => { return; });
  mockOnCancelAddMember = jest.fn(() => { return; });
  mockAddMember = jest.fn((projectId, memberValues, resolve, reject) => {
    resolve("success")
  });

  props = {
    onSuccessAddingMember: mockOnSuccessAddingMember,
    onCancelAddMember: mockOnCancelAddMember,
    addMember: mockAddMember,
    projects: {
      chosenProject: {
        projectId: "123"
      }
    },
    members: {
      roles: [
        {
          roleId: "1",
          roleName: "developer"
        },
        {
          roleId: "2",
          roleName: "principal contractor"
        }
      ]
    }
  };
});

it('Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('enter email address and click submit', () => {
  const component = mount(<Component {...props} />);
  const username = component.find('#emailAddress')
  username.simulate('change', { target: { name: "emailAddress", value: 'hootsuite@prind.tech' }});
  expect(component.state('emailAddress')).toEqual("hootsuite@prind.tech")
  component.find('#submit').simulate('click')
  expect(mockAddMember).toHaveBeenCalledWith("123", {emailAddress: 'hootsuite@prind.tech', roleId: '1'}, expect.any(Function), expect.any(Function))
});


it('enter email address and click submit and fail', () => {
  mockAddMember = jest.fn((projectId, memberValues, resolve, reject) => {
    reject("failed")
  });
  props.addMember = mockAddMember
  const component = mount(<Component {...props} />);
  const username = component.find('#emailAddress')
  username.simulate('change', { target: { name: "emailAddress", value: 'hootsuite@prind.tech' }});
  component.find('#submit').simulate('click')
  expect(mockAddMember).toHaveBeenCalledWith("123", {emailAddress: 'hootsuite@prind.tech', roleId: '1'}, expect.any(Function), expect.any(Function))
  expect(component).toMatchSnapshot();
});

it('should cancel adding member', () => {
  const component = shallow(<Component {...props} />);
  const button = component.find('input[id="cancel"]')
  button.simulate('click', { stopPropagation: function() {} })
  expect(mockOnCancelAddMember).toHaveBeenCalledTimes(1);
});
