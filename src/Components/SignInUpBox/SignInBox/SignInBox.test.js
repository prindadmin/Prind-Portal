import React from 'react';
import { shallow } from 'enzyme';

import SignInBox from './SignInBox'
import CanUseWebP from '../../../Functions/CheckIfWebpSupported'
jest.mock('../../../Functions/CheckIfWebpSupported')


it('Should render sign in box', () => {
  const mockSignIn = jest.fn();
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<SignInBox {...props} />);
  expect(component).toMatchSnapshot();
});



it('Should render sign in box with webp', () => {
  CanUseWebP.mockReturnValue(true)
  const mockSignIn = jest.fn();
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<SignInBox {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should find all controls', () => {
  const mockSignIn = jest.fn();
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<SignInBox {...props} />);

  expect(component.find('input[id="email"]')).toHaveLength(1);
  expect(component.find('input[id="password"]')).toHaveLength(1);
  expect(component.find('input[id="signInButton"]')).toHaveLength(1);
});


it('Should fill in username and password', () => {
  const mockSignIn = jest.fn();
  const mockHistoryPush = jest.fn()
  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<SignInBox {...props} />);

  const username = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  username.simulate('change', { target: { name: "email", value: 'hootsuite@buildingim.com' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});

  expect(component.state('email')).toEqual('hootsuite@buildingim.com');
  expect(component.state('password')).toEqual('Password1234!');
});


it('Should attempt to login', () => {
  const mockSignIn = jest.fn();
  const mockHistoryPush = jest.fn()

  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<SignInBox {...props} />);

  const username = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  const submitButton = component.find('input[id="signInButton"]')
  username.simulate('change', { target: { name: "email", value: 'hootsuite@buildingim.com' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});
  submitButton.simulate('click');
  expect(mockSignIn).toHaveBeenCalledWith({email: 'hootsuite@buildingim.com', password: 'Password1234!'},expect.any(Function), expect.any(Function));
});


it('Should click forgot password text', () => {
  const mockSignIn = jest.fn();
  const mockHistoryPush = jest.fn()

  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<SignInBox {...props} />);

  const forgotPassword = component.find('p.forgot-your-password-text')
  forgotPassword.simulate('click');
  expect(component).toMatchSnapshot();
});


it('Should click sign up text', () => {
  const mockSignIn = jest.fn();
  const mockHistoryPush = jest.fn()

  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<SignInBox {...props} />);

  const signUp = component.find('p.sign-up-in-text')
  signUp.simulate('click');
  expect(component).toMatchSnapshot();
});


it('Should complete login', () => {
  const mockSignIn = jest.fn((userDetails, resolve, reject) => {
    resolve()
  });
  const mockHistoryPush = jest.fn()

  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<SignInBox {...props} />);

  const username = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  const submitButton = component.find('input[id="signInButton"]')
  username.simulate('change', { target: { name: "email", value: 'hootsuite@buildingim.com' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});
  submitButton.simulate('click');
  expect(mockSignIn).toHaveBeenCalledWith({email: 'hootsuite@buildingim.com', password: 'Password1234!'},expect.any(Function), expect.any(Function));
  expect(component).toMatchSnapshot();
});


it('Should fail login', () => {
  const mockSignIn = jest.fn((userDetails, resolve, reject) => {
    reject({ message: 'failed' })
  });
  const mockHistoryPush = jest.fn()

  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<SignInBox {...props} />);

  const username = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  const submitButton = component.find('input[id="signInButton"]')
  username.simulate('change', { target: { name: "email", value: 'hootsuite@buildingim.com' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});
  submitButton.simulate('click');
  expect(mockSignIn).toHaveBeenCalledWith({email: 'hootsuite@buildingim.com', password: 'Password1234!'},expect.any(Function), expect.any(Function));
  expect(component).toMatchSnapshot();
});


it('Should load with username prop', () => {
  const mockSignIn = jest.fn((userDetails, resolve, reject) => {
    reject({ message: 'failed' })
  });
  const mockHistoryPush = jest.fn()

  const props = {
    toggleVisibleForm: function() { },
    signIn: mockSignIn,
    history: {
      push: mockHistoryPush,
    },
    user: {
      currentRoute: '/profile'
    },
    username: '1234'
  };
  const component = shallow(<SignInBox {...props} />);

  const username = component.find('input[id="email"]')
  const password = component.find('input[id="password"]')
  const submitButton = component.find('input[id="signInButton"]')
  username.simulate('change', { target: { name: "email", value: 'hootsuite@buildingim.com' }});
  password.simulate('change', { target: { name: "password", value: 'Password1234!' }});
  submitButton.simulate('click');
  expect(mockSignIn).toHaveBeenCalledWith({email: 'hootsuite@buildingim.com', password: 'Password1234!'},expect.any(Function), expect.any(Function));
  expect(component).toMatchSnapshot();
});
