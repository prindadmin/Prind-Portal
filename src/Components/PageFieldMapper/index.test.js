
import { shallow } from 'enzyme';

import Component from './index'

it('PageFieldMapper - Should render file uploader', () => {
  const props = {
    singleField: {
      id: "1",
      type: "file",
      fieldDetails: "fieldDetails"
    },
    pageName: "design",
    projectId: "123"
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('PageFieldMapper - Should render dropdown', () => {
  const props = {
    singleField: {
      id: "1",
      type: "dropdown",
      fieldDetails: "fieldDetails"
    },
    pageName: "design",
    projectId: "123"
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('PageFieldMapper - Should render calendar', () => {
  const props = {
    singleField: {
      id: "1",
      type: "calendar",
    },
    pageName: "design",
    projectId: "123"
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('PageFieldMapper - Should render longText', () => {
  const props = {
    singleField: {
      id: "1",
      type: "longText",
      fieldDetails: "fieldDetails"
    },
    pageName: "design",
    projectId: "123"
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('PageFieldMapper - Should render gitText', () => {
  const props = {
    singleField: {
      id: "1",
      type: "gitText",
    },
    pageName: "design",
    projectId: "123"
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('PageFieldMapper - Should render nothing', () => {
  const props = {
    singleField: {
      id: "1",
      type: "carrot",
    },
    pageName: "design",
    projectId: "123"
  }
  const component = shallow(<Component {...props} />);
  expect(component).toEqual({});
});
