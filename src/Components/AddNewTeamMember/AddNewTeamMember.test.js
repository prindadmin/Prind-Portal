import React from 'react';
import { shallow } from 'enzyme';

import Component from './AddNewTeamMember'

it('Should render', () => {
  const props = {
    handleSubmit: function() {},
    onItemSelected: function() {},
    onCancelAddMember: function() {},
    addMemberError: false,
    errorText: "",
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

// TODO: Fix this test; it doesn't get a callback when the button is clicked
it('enter email address and click submit', () => {
  const mockCallBackHandleSubmit = jest.fn();
  const mockCallBackOnItemSelected = jest.fn();
  const props = {
    handleSubmit: mockCallBackHandleSubmit,
    onItemSelected: mockCallBackOnItemSelected,
    onCancelAddMember: function() {},
    addMemberError: false,
    errorText: "",
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
  const username = component.find('#emailAddress')
  username.simulate('change', { target: { name: "emailAddress", value: 'hootsuite@prind.tech' }});
  component.find('#submit').simulate('click')
  expect(mockCallBackHandleSubmit).toHaveBeenCalled()
});
