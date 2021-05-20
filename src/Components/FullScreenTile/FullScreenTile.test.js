import React from 'react';
import { shallow } from 'enzyme';
import Component from './FullScreenTile'
import * as States from '../../States'
import * as Endpoints from '../../Data/Endpoints'
import * as Strings from '../../Data/Strings'


it('Should render', () => {
  const props = {
    text: "Hello, Full Screen",
    icon: "file-search"
  };

  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render with default text', () => {
  const props = {
    icon: "file-search"
  };

  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
