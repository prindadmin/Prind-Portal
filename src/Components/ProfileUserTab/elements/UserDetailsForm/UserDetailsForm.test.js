import React from 'react';
import { shallow } from 'enzyme';

import Component from './UserDetailsForm'
//import * as Strings from '../../Data/Strings'

var props = {}

it('should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
