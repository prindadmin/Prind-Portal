import React from 'react';
import { shallow } from 'enzyme';

import Component from './NoProjectSelected'

it('Should render', () => {
  const props = {}
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
