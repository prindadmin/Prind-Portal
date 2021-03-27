import React from 'react';
import { shallow } from 'enzyme';

import SignUpBox from './SignUpBox'


it('Should render sign in box', () => {
  const mockSignUp = jest.fn();
  const mockHistoryPush = jest.fn()
  const mockInit = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signUp: mockSignUp,
    history: {
      push: mockHistoryPush,
    },
    init: mockInit
  };
  const component = shallow(<SignUpBox {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should find all controls', () => {
  const mockSignUp = jest.fn();
  const mockHistoryPush = jest.fn()
  const mockInit = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signUp: mockSignUp,
    history: {
      push: mockHistoryPush,
    },
    init: mockInit
  };
  const component = shallow(<SignUpBox {...props} />);
  expect(component.find('input[id="email"]')).toHaveLength(1);
  expect(component.find('input[id="password"]')).toHaveLength(1);
  expect(component.find('input[id="firstName"]')).toHaveLength(1);
  expect(component.find('input[id="lastName"]')).toHaveLength(1);
  expect(component.find('input[id="company"]')).toHaveLength(1);
  expect(component.find('input[id="signUpButton"]')).toHaveLength(1);
});


it('Should fill in email, password, first name, last name, and company, then submit', () => {
  const mockSignUp = jest.fn();
  const mockHistoryPush = jest.fn()
  const mockInit = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signUp: mockSignUp,
    history: {
      push: mockHistoryPush,
    },
    init: mockInit
  };
  const component = shallow(<SignUpBox {...props} />);

  const email = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  const firstName = component.find('input[id="password"]')
  const lastName = component.find('input[id="password"]')
  const company = component.find('input[id="password"]')
  const button = component.find('input[id="signUpButton"]')
  email.simulate('change', { target: { name: "email", value: 'Hootsuite@buildingim.com' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});
  firstName.simulate('change', { target: { name: "firstName", value: 'Testy' }});
  lastName.simulate('change', { target: { name: "lastName", value: 'McTesterson' }});
  company.simulate('change', { target: { name: "company", value: 'test company' }});

  expect(component.state('email')).toEqual('Hootsuite@buildingim.com');
  expect(component.state('password')).toEqual('Password1234!');
  expect(component.state('firstName')).toEqual('Testy');
  expect(component.state('lastName')).toEqual('McTesterson');
  expect(component.state('company')).toEqual('test company');

  button.simulate('click', { preventDefault: function() {} });
  expect(mockSignUp).toHaveBeenCalledWith({
    email: 'hootsuite@buildingim.com',
    password: 'Password1234!',
    firstName: 'Testy',
    lastName: 'McTesterson',
    company: 'test company'
  },
  expect.any(Function),
  expect.any(Function));
});


it('Should click sign in text', () => {
  const mockSignUp = jest.fn();
  const mockHistoryPush = jest.fn()
  const mockInit = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signUp: mockSignUp,
    history: {
      push: mockHistoryPush,
    },
    init: mockInit
  };
  const component = shallow(<SignUpBox {...props} />);
  const signUp = component.find('p.sign-up-in-text')
  signUp.simulate('click');
  expect(component).toMatchSnapshot();
});


it('Should complete login', () => {
  const mockSignUp = jest.fn((userDetails, resolve, reject) => {
    resolve()
  });
  const mockHistoryPush = jest.fn()
  const mockInit = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signUp: mockSignUp,
    history: {
      push: mockHistoryPush,
    },
    init: mockInit
  };
  const component = shallow(<SignUpBox {...props} />);

  const email = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  const firstName = component.find('input[id="password"]')
  const lastName = component.find('input[id="password"]')
  const company = component.find('input[id="password"]')
  const button = component.find('input[id="signUpButton"]')
  email.simulate('change', { target: { name: "email", value: 'Hootsuite@buildingim.com' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});
  firstName.simulate('change', { target: { name: "firstName", value: 'Testy' }});
  lastName.simulate('change', { target: { name: "lastName", value: 'McTesterson' }});
  company.simulate('change', { target: { name: "company", value: 'test company' }});

  expect(component.state('showSignUpCompleted')).toEqual(false);
  button.simulate('click', { preventDefault: function() {} });
  expect(component.state('showSignUpCompleted')).toEqual(true);
  expect(component).toMatchSnapshot();
});


it('Should fail login', () => {
  const mockSignUp = jest.fn((userDetails, resolve, reject) => {
    reject({ message: "failed" })
  });
  const mockHistoryPush = jest.fn()
  const mockInit = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signUp: mockSignUp,
    history: {
      push: mockHistoryPush,
    },
    init: mockInit
  };
  const component = shallow(<SignUpBox {...props} />);

  const email = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  const firstName = component.find('input[id="password"]')
  const lastName = component.find('input[id="password"]')
  const company = component.find('input[id="password"]')
  const button = component.find('input[id="signUpButton"]')
  email.simulate('change', { target: { name: "email", value: 'Hootsuite@buildingim.com' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});
  firstName.simulate('change', { target: { name: "firstName", value: 'Testy' }});
  lastName.simulate('change', { target: { name: "lastName", value: 'McTesterson' }});
  company.simulate('change', { target: { name: "company", value: 'test company' }});

  expect(component.state('showSignUpError')).toEqual(false);
  button.simulate('click', { preventDefault: function() {} });
  expect(component.state('showSignUpError')).toEqual(true);
  expect(component.state('errorMessage')).toEqual('failed');
  expect(component).toMatchSnapshot();
});




it('Should click form', () => {
  const mockSignUp = jest.fn();
  const mockHistoryPush = jest.fn()
  const mockInit = jest.fn()
  const mockPreventDefault = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signUp: mockSignUp,
    history: {
      push: mockHistoryPush,
    },
    init: mockInit
  };
  const component = shallow(<SignUpBox {...props} />);
  const signUpForm = component.find('form.sign-up-form')
  signUpForm.simulate('submit', { preventDefault: mockPreventDefault });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1)
  expect(component).toMatchSnapshot();
});
