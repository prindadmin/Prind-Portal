import React from 'react';
import { shallow, mount } from 'enzyme';

import Component from './CreateCustomFieldPopover'

it('Should render', () => {
  const props = {
    projectId: "123",
    pageName: "occupation",
    onClosePopover: function() {},
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

// TODO: CONTINUE HERE
