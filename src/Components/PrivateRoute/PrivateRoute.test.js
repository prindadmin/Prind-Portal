import React from 'react';
import { shallow, mount } from 'enzyme';
import Component from './PrivateRoute'
import SubComponent from '../Error404'
import * as States from '../../States'


import {
  HashRouter as Router,
  Route,
} from "react-router-dom";

it('Should render when not logged in', () => {
  const mockStoreRoute = jest.fn()
  const props = {
    auth: {
      isSignedIn: States.AUTH_UNKNOWN
    },
    path: '/documents',
    location: {
      pathname: '/documents'
    },
    user: {
      currentRoute: '/documents'
    },
    component: <SubComponent />,
    storeRoute: mockStoreRoute
  };
  const component = shallow(<Component {...props} />);
  expect(mockStoreRoute).not.toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});


it('Should render when logged in', () => {
  const mockStoreRoute = jest.fn()
  const props = {
    auth: {
      isSignedIn: States.AUTH_SUCCESS
    },
    path: '/documents',
    location: {
      pathname: '/documents'
    },
    user: {
      currentRoute: '/documents'
    },
    component: <SubComponent />,
    storeRoute: mockStoreRoute
  };
  const component = shallow(<Component {...props} />);
  expect(mockStoreRoute).not.toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});


it('Should render then change route', () => {
  const mockStoreRoute = jest.fn()
  const props = {
    auth: {
      isSignedIn: States.AUTH_SUCCESS
    },
    path: '/documents',
    location: {
      pathname: '/documents'
    },
    user: {
      currentRoute: '/profile'
    },
    component: <SubComponent />,
    storeRoute: mockStoreRoute
  };
  const component = shallow(<Component {...props} />);
  expect(mockStoreRoute).toHaveBeenCalledTimes(1);
  expect(mockStoreRoute).toHaveBeenCalledWith('/documents');
  expect(component).toMatchSnapshot();
});



it('Should render then rerender with changed props', () => {
  const mockStoreRoute = jest.fn()
  var props = {
    auth: {
      isSignedIn: States.AUTH_SUCCESS
    },
    path: '/documents',
    location: {
      pathname: '/documents'
    },
    user: {
      currentRoute: '/documents'
    },
    component: <SubComponent />,
    storeRoute: mockStoreRoute
  };
  const component = shallow(<Component {...props} />);
  expect(mockStoreRoute).not.toHaveBeenCalled();

  const prevProps = JSON.parse(JSON.stringify(props));
  props.location.pathname = '/profile'
  props.path = '/profile'
  component.setProps(props)
  component.instance().componentDidUpdate(prevProps)
  expect(mockStoreRoute).toHaveBeenCalledTimes(2);
  expect(mockStoreRoute).toHaveBeenCalledWith('/profile');
});


it('Should render then rerender with changed props (not path)', () => {
  const mockStoreRoute = jest.fn()
  var props = {
    auth: {
      isSignedIn: States.AUTH_SUCCESS
    },
    path: '/documents',
    location: {
      pathname: '/documents'
    },
    user: {
      currentRoute: '/documents'
    },
    component: <SubComponent />,
    storeRoute: mockStoreRoute
  };
  const component = shallow(<Component {...props} />);
  expect(mockStoreRoute).not.toHaveBeenCalled();

  const prevProps = JSON.parse(JSON.stringify(props));
  props.location.tomato = 'fruit'
  component.setProps(props)
  component.instance().componentDidUpdate(prevProps)
  expect(mockStoreRoute).not.toHaveBeenCalled();
});

/*
it('Should render then rerender with logged out user', () => {
  const mockStoreRoute = jest.fn()
  var props = {
    auth: {
      isSignedIn: States.AUTH_SUCCESS
    },
    path: '/documents',
    location: {
      pathname: '/documents'
    },
    user: {
      currentRoute: '/documents'
    },
    component: SubComponent,
    storeRoute: mockStoreRoute
  };
  const component = mount(<Router><Component {...props} /></Router>);
  expect(mockStoreRoute).not.toHaveBeenCalled();

  const prevProps = JSON.parse(JSON.stringify(props));
  props.auth.isSignedIn = States.AUTH_UNKNOWN
  component.setProps(props)
  component.instance().componentDidUpdate(prevProps)
  expect(mockStoreRoute).not.toHaveBeenCalled();
});
*/
