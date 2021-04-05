
import { shallow } from 'enzyme';
import Component from './Error404'

var props;

beforeEach(() => {
  props = {};
})

it('Error404 - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
