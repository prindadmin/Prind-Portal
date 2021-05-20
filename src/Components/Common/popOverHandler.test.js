
import Component from './popOverHandler'
import { shallow } from 'enzyme';

import { JSDOM } from "jsdom"

var props;

beforeAll(() => {
  document.body.innerHTML =
    '<div id="root">' +
    '</div>' +
    '<div id="popOver">' +
    '</div>';
});

beforeEach(() => {
  props = {
    children: [<div key='1' id='hello-dom' />]
  }
});

it('PopOverHandler - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
