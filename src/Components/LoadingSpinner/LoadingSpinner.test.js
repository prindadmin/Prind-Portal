import React from 'react';
import { shallow } from 'enzyme';
import Component from './LoadingSpinner'

it('Should render', () => {
  const props = {};
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Should render at a smaller size', () => {
  const props = {
    size: 40
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
