import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';
import Component from './SignInUpBox'
import * as States from '../../States'
import * as Endpoints from '../../Data/Endpoints'

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
});

it('Should render sign in', () => {
  const mockHistoryPush = jest.fn()
  const props = {
    isSignIn: true,
    isSignUp: false,
    isForgotPassword: false,
    isPasswordReset: false,
    username: "testing@buildingim.com",
    history: {
      push: mockHistoryPush
    },
    location: {
      pathname: '/signin'
    },
    auth: {
      isSignedIn: States.AUTH_UNKNOWN
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render sign up', () => {
  const mockHistoryPush = jest.fn()
  const props = {
    isSignIn: false,
    isSignUp: true,
    isForgotPassword: false,
    isPasswordReset: false,
    username: "testing@buildingim.com",
    history: {
      push: mockHistoryPush
    },
    location: {
      pathname: '/signin'
    },
    auth: {
      isSignedIn: States.AUTH_UNKNOWN
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render forgot password', () => {
  const mockHistoryPush = jest.fn()
  const props = {
    isSignIn: false,
    isSignUp: false,
    isForgotPassword: true,
    isPasswordReset: false,
    username: "testing@buildingim.com",
    history: {
      push: mockHistoryPush
    },
    location: {
      pathname: '/signin'
    },
    auth: {
      isSignedIn: States.AUTH_UNKNOWN
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render password reset', () => {
  const mockHistoryPush = jest.fn()
  const props = {
    isSignIn: false,
    isSignUp: false,
    isForgotPassword: false,
    isPasswordReset: true,
    username: "testing@buildingim.com",
    history: {
      push: mockHistoryPush
    },
    location: {
      pathname: '/signin'
    },
    auth: {
      isSignedIn: States.AUTH_UNKNOWN
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render sign in, change props to logged in, and update', () => {
  const mockHistoryPush = jest.fn()
  var props = {
    isSignIn: true,
    isSignUp: false,
    isForgotPassword: false,
    isPasswordReset: false,
    username: "testing@buildingim.com",
    history: {
      push: mockHistoryPush
    },
    location: {
      pathname: '/signin'
    },
    auth: {
      isSignedIn: States.AUTH_SUCCESS
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const prevProps = props
  const component = shallow(<Component {...props} />);
  props.location.pathname = '/profile'
  component.setProps(props)
  component.instance().componentDidUpdate(prevProps)
  expect(component).toMatchSnapshot();
});


it('Should render sign in then cycle through all form options', () => {
  const mockHistoryPush = jest.fn()
  const props = {
    isSignIn: true,
    isSignUp: false,
    isForgotPassword: false,
    isPasswordReset: false,
    username: "testing@buildingim.com",
    history: {
      push: mockHistoryPush
    },
    location: {
      pathname: '/signin'
    },
    auth: {
      isSignedIn: States.AUTH_UNKNOWN
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<Component {...props} />);
  component.instance().toggleVisibleForm(States.SIGNINFORM)
  expect(mockHistoryPush).toHaveBeenCalledWith(Endpoints.SIGNINPAGE)
  component.instance().toggleVisibleForm(States.SIGNUPFORM)
  expect(mockHistoryPush).toHaveBeenCalledWith(Endpoints.SIGNUPPAGE)
  component.instance().toggleVisibleForm(States.FORGOTPASSWORDFORM)
  expect(mockHistoryPush).toHaveBeenCalledWith(Endpoints.FORGOTPASSWORDPAGE)
});


it('Should render sign in then show default box because provided form does not exist', () => {
  const mockHistoryPush = jest.fn()
  const props = {
    isSignIn: true,
    isSignUp: false,
    isForgotPassword: false,
    isPasswordReset: false,
    username: "testing@buildingim.com",
    history: {
      push: mockHistoryPush
    },
    location: {
      pathname: '/signin'
    },
    auth: {
      isSignedIn: States.AUTH_UNKNOWN
    },
    user: {
      currentRoute: '/profile'
    }
  };
  const component = shallow(<Component {...props} />);
  component.instance().toggleVisibleForm("NON-EXISTENT FORM")
  expect(mockHistoryPush).toHaveBeenCalledWith(Endpoints.SIGNINPAGE)
});
