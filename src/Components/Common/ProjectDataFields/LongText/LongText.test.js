import React from 'react';
import { shallow } from 'enzyme';

import Component from './LongText'

it('Should render', () => {
  const props = {
    elementContent: {
      id: "2",
      title: "Long Text Box",
      description: "Long Text Box Description",
      editable: true,
      fieldDetails:{
        textValue: "Test save.",
      },
    },
    pageName: "occupation",
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
