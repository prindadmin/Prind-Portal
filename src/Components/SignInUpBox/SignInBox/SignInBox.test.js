import React from 'react';
import { shallow } from 'enzyme';

import SignInBox from './SignInBox'


it('should render sign in box', () => {
  const props = {
    toggleVisibleForm: function(e) { console.log(e) }
  };
  const component = shallow(<SignInBox {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should find all controls', () => {
  const props = {
    toggleVisibleForm: function(e) { console.log(e) }
  };
  const component = shallow(<SignInBox {...props} />);

  expect(component.find('input[id="email"]')).toHaveLength(1);
  expect(component.find('input[id="password"]')).toHaveLength(1);
  expect(component.find('input[id="signInButton"]')).toHaveLength(1);
});


it('Should fill in username and password', () => {
  const props = {
    toggleVisibleForm: function(e) { console.log(e) }
  };
  const component = shallow(<SignInBox {...props} />);

  const username = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  username.simulate('change', { target: { name: "email", value: 'hootsuite@prind.tech' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});

  expect(component.state('email')).toEqual('hootsuite@prind.tech');
  expect(component.state('password')).toEqual('Password1234!');
});


// TODO: should read value of login
it('Should attempt to login', () => {
  const mockSignIn = jest.fn();

  const props = {
    toggleVisibleForm: function(e) { console.log(e) },
    signIn: mockSignIn,
  };
  const component = shallow(<SignInBox {...props} />);

  const username = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  const submitButton = component.find('input[id="signInButton"]')
  username.simulate('change', { target: { name: "email", value: 'hootsuite@prind.tech' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});
  submitButton.simulate('click');
  expect(mockSignIn).toHaveBeenCalledWith({email: 'hootsuite@prind.tech', password: 'Password1234!'},expect.any(Function), expect.any(Function));
});
