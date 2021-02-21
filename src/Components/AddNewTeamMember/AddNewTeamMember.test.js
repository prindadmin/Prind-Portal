import React from 'react';
import { shallow, mount } from 'enzyme';

import Component from './AddNewTeamMember'

it('Should render', () => {
  const props = {
    onSuccessAddingMember: function() {},
    onCancelAddMember: function() {},
    addMember: function() {},
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
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('enter email address and click submit', () => {
  const mockOnSuccessAddingMember = jest.fn();
  const mockOnCancelAddMember = jest.fn();
  const mockAddMember = jest.fn();
  const props = {
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

  const component = mount(<Component {...props} />);
  const username = component.find('#emailAddress')
  username.simulate('change', { target: { name: "emailAddress", value: 'hootsuite@prind.tech' }});
  component.find('#submit').simulate('click')
  expect(mockAddMember).toHaveBeenCalledWith("123", {emailAddress: 'hootsuite@prind.tech', roleId: '1'}, expect.any(Function), expect.any(Function))
});
