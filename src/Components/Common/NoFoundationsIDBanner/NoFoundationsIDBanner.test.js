import React from 'react';
import { shallow } from 'enzyme';

import Component from './NoFoundationsIDBanner'

it('Should not render if user has Foundations ID', () => {
  const props = {
    user: {
      details: {
        foundationsID: '123'
      }
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render if user has Foundations ID', () => {
  const props = {
    user: {
      details: {}
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should not render if not enough user details provided', () => {
  const props = {
    user: {}
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
